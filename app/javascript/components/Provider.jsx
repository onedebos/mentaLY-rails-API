import React from 'react';
import { Link } from 'react-router-dom';

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: { name: '', email: '', state: '', logo: '', description: '' },
    };
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
              <button type="button" className="btn btn-danger">
                Delete Recipe
              </button>
            </div>
          </div>
          <Link to="/providers" className="btn btn-link">
            Back to providers
          </Link>
        </div>
      </div>
    );
  }
}

export default Provider;
