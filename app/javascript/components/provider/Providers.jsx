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
    const { userStatus } = this.props;

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
              to={`/make_appointment/${provider.id}`}
              className="btn custom-button ml-2"
            >
              Book Appointments
            </Link>
          </div>
        </div>
      </div>
    ));
    const noProvider = (
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
              Here are some of our favorite mental health providers we work
              with. <br />
              Click on any of them to book an appointment with them.
              <br />
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              {userStatus.admin === true ? (
                <Link to="/provider" className="btn custom-button">
                  New Provider
                </Link>
              ) : (
                ''
              )}
            </div>
            <div className="text-right mb-3">
              <Link
                to={`/appointments/${userStatus.id}`}
                className="btn custom-button"
              >
                See your Appointments
              </Link>
            </div>
            <div className="row">
              {providers.length > 0 ? allProviders : noProvider}
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
