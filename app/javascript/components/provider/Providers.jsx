import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Providers.css';
import ProvidersComponent from './ProvidersComponent';

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
    const { userStatus, loggedInStatus } = this.props;

    const allProviders = providers.map((provider, index) => (
      <div key={index}>
        <ProvidersComponent
          imageURL={provider.logo}
          name={provider.name}
          alt={`${provider.name} image`}
          providerURL={`/provider/${provider.id}`}
          appointmentURL={`/make_appointment/${provider.id}`}
        />
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
        {loggedInStatus === 'LOGGED_in' ? (
          <div className="providers-page-title">
            <h1 className="providers-heading">OUR PARTNERS</h1>
            <p className="providers-subheading">
              Select a provider to book an appointment
            </p>
            <hr className="rule" />
            <div className="grid-for-providers-list">
              {providers.length > 0 ? allProviders : noProvider}
            </div>
          </div>
        ) : (
          <div>You're not logged in</div>
        )}
      </>
    );
  }
}

export default Providers;
