import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Menu.css';

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
      <div>
        <div className="user-name">
          <p className="user-name">@{user.name}</p>
        </div>
        <div className="menu-items">
          <Link to="/" className={`menu-item`} href="#">
            Home
          </Link>
          <Link to="/providers" className={`menu-item`}>
            Partners
          </Link>
          <Link to={`/appointments/${user.id}`} className={`menu-item`}>
            Appointments
          </Link>
          {userStatus.admin === true ? (
            <Link to={`/provider`} className="menu-item">
              NEW PARTNER
            </Link>
          ) : (
            ''
          )}
          <Link
            to="/"
            onClick={() => this.handleLogOutClick()}
            className="menu-item"
            href="#"
          >
            Logout
          </Link>
        </div>
      </div>
    );

    return (
      <nav className="menu-bar">
        <h3 className="menu-logo">MentaLLy</h3>
        <img
          className="user-avatar"
          src="https://api.adorable.io/avatars/100/abott@adorable.png"
        />

        {loggedInStatus === 'LOGGED_in' ? navigation(userStatus) : <div></div>}
      </nav>
    );
  }
}
