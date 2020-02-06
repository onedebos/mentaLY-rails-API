import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleLogOutClick() {
    axios
      .delete('/api/v1/logout', {
        withCredentials: true,
      })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log('logout error', error);
      });
    this.props.handleLogout();
  }
  render() {
    const { loggedInStatus, userStatus } = this.props;
    const navigation = user => (
      <div className="navbar-nav">
        <Link to="/providers" className="nav-item nav-link">
          Partners
        </Link>
        <Link to={`/appointments/${user.id}`} className="nav-item nav-link">
          Your Appointments
        </Link>
        <Link
          to="/"
          className="nav-item nav-link"
          onClick={() => this.handleLogOutClick()}
        >
          Logout
        </Link>
        <span className="navbar-text flex-row">{user.name}</span>
      </div>
    );

    const auth = () => (
      <div className="navbar-nav">
        <Link to="/login" className="nav-item nav-link">
          Login
        </Link>
        <Link to="/sign_up" className="nav-item nav-link">
          Sign up
        </Link>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            MentaLLy
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link active">
                Home <span className="sr-only">(current)</span>
              </Link>
              {loggedInStatus === 'LOGGED_in' ? navigation(userStatus) : auth()}
              {console.log(loggedInStatus)}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
