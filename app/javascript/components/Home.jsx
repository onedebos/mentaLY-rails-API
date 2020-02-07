import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import './styles/Home.css';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    const { users } = this.props;
    const userInfo = users.map(user => (
      <div key={user.name}>
        {user.id}
        {user.name}
        {user.email}
      </div>
    ));
    return (
      <div className="home-body">
        <header>
          <div className="menu">
            <FontAwesomeIcon className="menu-icon" icon={faBars} />
            <FontAwesomeIcon className="menu-icon" icon={faSearch} />
          </div>

          <h1 className="logo-title">MentaLLy</h1>
          <p>Book mental health services across Nigeria.</p>
          {loggedInStatus === 'NOT_LOGGED_IN' ? (
            <div>
              <Link to="/sign_up">
                <button className="sign-up">
                  Sign up to book
                  <FontAwesomeIcon
                    className="sign-up-arrow"
                    icon={faChevronCircleRight}
                  />
                </button>
              </Link>
              <div>
                <p className="have-account">have an account?</p>
                <Link to="/login" className="sign-in">
                  Sign in
                  <FontAwesomeIcon
                    className="sign-up-arrow"
                    icon={faChevronCircleRight}
                  />
                </Link>
              </div>
            </div>
          ) : (
            <p className="signed-in">
              You're signed in. &nbsp;
              <Link to="/providers">See our partners</Link>
            </p>
          )}
        </header>
      </div>
    );
  }
}

const StructuredSelector = createStructuredSelector({
  users: state => state.users,
});

const mapDispatchToProps = { getUser };

export default connect(StructuredSelector, mapDispatchToProps)(Home);
