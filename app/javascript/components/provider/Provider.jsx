import React from 'react';
import { Link } from 'react-router-dom';

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: { name: '', email: '', state: '', logo: '', description: '' },
    };
    this.deleteProvider = this.deleteProvider.bind(this);
  }
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const url = `/api/v1/providers/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ provider: response }))
      .catch(() => this.props.history.push('/provider'));
  }

  deleteProvider() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const url = `/api/v1/providers/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(() => this.props.history.push('/providers'))
      .catch(error => console.log(error.message));
  }

  render() {
    const { provider } = this.state;

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={provider.logo}
            alt={`${provider.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {provider.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group" key={provider.id}>
                <h5 className="mb-2">Details</h5>
                <li>{provider.email}</li>
                <li>{provider.state}</li>
                <li>{provider.description}</li>
              </ul>
            </div>
            <div className="col-sm-12 col-lg-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.deleteProvider}
              >
                Delete Provider
              </button>
            </div>
          </div>

          <Link to="/providers" className="btn btn-link">
            Back to providers
          </Link>
          <Link
            to={`/make_appointment/${provider.id}`}
            className="btn btn-link"
          >
            Book appointment with this provider
          </Link>
          <Link to={`/edit/${provider.id}`} className="btn btn-link">
            Edit details
          </Link>
        </div>
      </div>
    );
  }
}

export default Provider;
