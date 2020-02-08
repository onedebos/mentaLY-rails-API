import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';
import Home from '../components/Home';
import Providers from '../components/provider/Providers';
import UserCon from '../components/container/User';
import ProviderComponent from './provider/ProviderComponent';
import NewProvider from '../components/provider/NewProvider';
import NewAppointment from '../components/appointments/NewAppointment';
import EditProvider from '../components/provider/EditProvider';
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';
import Appointments from '../components/appointments/Appointments';
import UserAppointment from '../components/appointments/UserAppointment';
import './styles/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get('/api/v1/logged_in', { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === 'NOT_LOGGED_IN'
        ) {
          this.setState({
            loggedInStatus: 'LOGGED_in',
            user: response.data.user,
          });
        } else if (
          !response.data.logged_in &&
          this.state.loggedInStatus === 'LOGGED_IN'
        ) {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_in',
            user: {},
          });
        }
      })
      .catch(error => {
        console.log('check login err', error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_in',
      user: data.user,
    });
  }
  render() {
    const { loggedInStatus, user } = this.state;

    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path={'/'}
              render={props => (
                <Home
                  {...props}
                  loggedInStatus={loggedInStatus}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Route
              path={'/login'}
              render={props => (
                <Login
                  {...props}
                  loggedInStatus={loggedInStatus}
                  handleLogin={this.handleLogin}
                />
              )}
            />

            <Route
              exact
              path={'/sign_up'}
              render={props => (
                <Registration
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={loggedInStatus}
                />
              )}
            />
            <React.Fragment>
              <div className="App-styles">
                <Menu
                  loggedInStatus={loggedInStatus}
                  userStatus={user}
                  handleLogout={this.handleLogout}
                />

                <Route
                  exact
                  path={'/providers'}
                  render={props => (
                    <Providers
                      {...props}
                      loggedInStatus={loggedInStatus}
                      userStatus={user}
                    />
                  )}
                />
                <Route
                  exact
                  path={'/provider/:id'}
                  render={props => (
                    <ProviderComponent
                      {...props}
                      loggedInStatus={loggedInStatus}
                      userStatus={user}
                    />
                  )}
                />
                <Route
                  exact
                  path={'/provider/'}
                  render={props => (
                    <NewProvider {...props} loggedInStatus={loggedInStatus} />
                  )}
                />
                <Route
                  exact
                  path={'/make_appointment/:id'}
                  render={props => (
                    <NewAppointment
                      {...props}
                      loggedInStatus={loggedInStatus}
                      userStatus={user}
                    />
                  )}
                />
                <Route
                  exact
                  path={'/appointments/:id'}
                  render={props => (
                    <UserAppointment
                      {...props}
                      loggedInStatus={loggedInStatus}
                      userStatus={user}
                    />
                  )}
                />
                <Route
                  path={'/edit/:id'}
                  render={props => (
                    <EditProvider {...props} loggedInStatus={loggedInStatus} />
                  )}
                />

                <Route
                  path={'/user_appointments'}
                  render={props => (
                    <Appointments
                      {...props}
                      loggedInStatus={loggedInStatus}
                      handleLogin={this.handleLogin}
                      userStatus={user}
                    />
                  )}
                />
              </div>
            </React.Fragment>
          </Switch>
        </Router>
      </div>
    );
  }
}
