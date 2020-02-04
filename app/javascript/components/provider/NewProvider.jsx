import React from 'react';
import { Link } from 'react-router-dom';

class NewProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      state: '',
      logo: '',
      description: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = '/api/v1/providers/';
    const { name, email, state, logo, description } = this.state;

    if (name.length == 0 || email.length == 0 || state.length == 0) return;

    const body = {
      name,
      email,
      state,
      logo,
      description,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.props.history.push(`/provider/${response.id}`))
      .catch(error => console.log(error.message));
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new Provider to the list.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="recipeName">Provider name: </label>
                <input
                  type="text"
                  name="name"
                  id="providerName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">State:</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">logo:</label>
                <input
                  type="url"
                  name="logo"
                  id="logo"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="logoHelp" className="form-text text-muted">
                  Enter a URL where the logo is located
                </small>
              </div>
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                onChange={this.onChange}
              />
              <button type="submit" className="btn custom-button mt-3">
                Create Provider
              </button>
              <Link to="/providers" className="btn btn-link mt-3">
                Back to Providers
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProvider;
