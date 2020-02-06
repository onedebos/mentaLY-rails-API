import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push('/providers');
  }

  handleLogOutClick() {
    axios
      .delete('/api/v1/logout', {
        withCredentials: true,
      })
      .then(response => {
        this.props.handleLogout();
        this.props.history.push('/');
      })
      .catch(error => {
        console.log('logout error', error);
      });
    this.props.handleLogout();
  }
  render() {
    const { loggedInStatus } = this.props;
    const isLoggedIn = () =>
      loggedInStatus === 'NOT_LOGGED_IN' ? <h1>NOT IN</h1> : <h1>IN</h1>;
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Mentalee</h1>
            <p className="lead">
              Book appointments with mental health providers across Nigeria.
            </p>
            <hr className="my-4" />
            <Link
              to="/providers"
              className="btn btn-lg custom-button"
              role="button"
            >
              View Providers
            </Link>

            {isLoggedIn()}
            <button onClick={() => this.handleLogOutClick()}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
}
