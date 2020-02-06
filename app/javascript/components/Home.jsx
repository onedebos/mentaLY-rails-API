import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

const GET_USERS_REQUEST = 'GET_USER_REQUEST';
const GET_USERS_SUCCESS = 'GET_USER_SUCCESS';

const getUser = () => {
  console.log('getUser() Action!');
  return dispatch => {
    dispatch({ type: GET_USERS_REQUEST });
    return axios
      .get('/api/v1/providers', { withCredentials: true })
      .then(response => response.data)
      .then(json => dispatch(getUsersSuccess(json)))
      .catch(error => console.log(error));
  };
};

export function getUsersSuccess(json) {
  return {
    type: GET_USERS_SUCCESS,
    json,
  };
}

class Home extends React.Component {
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

    const { users } = this.props;
    const userInfo = users.map(user => (
      <div key={user.name}>
        {user.id}
        {user.name}
        {user.email}
      </div>
    ));
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
            <button className="getUserBtn" onClick={() => this.props.getUser()}>
              getUser
            </button>
            <ul>{userInfo}</ul>
          </div>
        </div>
      </div>
    );
  }
}

const StructuredSelector = createStructuredSelector({
  users: state => state.users,
});

const mapDispatchToProps = { getUser };

export default connect(StructuredSelector, mapDispatchToProps)(Home);
