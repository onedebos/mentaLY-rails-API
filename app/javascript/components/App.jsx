import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Providers from '../components/provider/Providers';
import Provider from '../components/provider/Provider';
import NewProvider from '../components/provider/NewProvider';
import NewAppointment from '../components/appointments/NewAppointment';
import EditProvider from '../components/provider/EditProvider';
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_in',
      user: data.user,
    });
  }
  render() {
    const { loggedInStatus } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={'/'}
            render={props => (
              <Home {...props} loggedInStatus={loggedInStatus} />
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
          <Route
            path={'/providers'}
            render={props => (
              <Providers {...props} loggedInStatus={loggedInStatus} />
            )}
          />
          <Route
            exact
            path={'/provider/:id'}
            render={props => (
              <Provider {...props} loggedInStatus={loggedInStatus} />
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
              <NewAppointment {...props} loggedInStatus={loggedInStatus} />
            )}
          />
          <Route
            path={'/edit/:id'}
            render={props => (
              <EditProvider {...props} loggedInStatus={loggedInStatus} />
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
        </Switch>
      </Router>
    );
  }
}

// export default props => <>{Routes}</>;
