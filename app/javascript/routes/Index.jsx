import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Providers from '../components/Providers';
import Provider from '../components/Provider';
import NewProvider from '../components/NewProvider';
import NewAppointment from '../components/appointments/NewAppointment';
import EditProvider from '../components/EditProvider';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/providers" exact component={Providers} />
      <Route path="/provider/:id" exact component={Provider} />
      <Route path="/provider/" exact component={NewProvider} />
      <Route path="/make_appointment/:id" exact component={NewAppointment} />
      <Route path="/edit/:id" exact component={EditProvider} />
    </Switch>
  </Router>
);
