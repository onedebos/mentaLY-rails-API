import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push('/providers');
  }

  render() {
    const { loggedInStatus } = this.props;
    const isNotLoggedIn = () => (
      <div>
        <Link to="/login" className="btn btn-lg custom-button" role="button">
          Sign in
        </Link>
        <Link
          to="/sign_up"
          className="btn btn-lg ml-4 custom-button"
          role="button"
        >
          Sign up
        </Link>
      </div>
    );

    const isLoggedIn = () => (
      <div>
        You're signed in.
        <Link to="/providers">See our partners</Link>
      </div>
    );
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">MentaLLy</h1>
            <p className="lead">
              Book appointments with mental health providers across Nigeria.
            </p>
            <hr className="my-4" />

            {loggedInStatus === 'LOGGED_in' ? isLoggedIn() : isNotLoggedIn()}
          </div>
        </div>
      </div>
    );
  }
}
