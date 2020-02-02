import React from 'react';
import { Link } from 'react-router-dom';

class Providers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [],
    };
  }

  componentDidMount() {
    const url = '/api/v1/providers/';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ providers: response }))
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { providers } = this.state;
    const allProviders = providers.map((provider, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={provider.logo}
            className="card-img-top"
            alt={`${provider.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{provider.name}</h5>
            <p className="card-title">{provider.email}</p>
            <Link to={`/provider/${provider.id}`} className="btn custom-button">
              View Provider
            </Link>
            <Link
              to={`/provider/${provider.id}/appointments`}
              className="btn custom-button"
            >
              Book Appointments
            </Link>
          </div>
        </div>
      </div>
    ));
    const noRecipe = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No Providers yet. Why not <Link to="/new_provider">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Our mental health partners</h1>
            <p className="lead text-muted">
              We’ve pulled together our most popular recipes, our latest
              additions, and our editor’s picks, so there’s sure to be something
              tempting for you to try.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/provider" className="btn custom-button">
                New Provider
              </Link>
            </div>
            <div className="row">
              {providers.length > 0 ? allProviders : noRecipe}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default Providers;
