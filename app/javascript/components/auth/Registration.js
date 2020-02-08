import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Field from './Field';
import Submit from '../auth/Submit';
import '../styles/Registration.css';

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      registrationErrors: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push('/providers');
  }

  handleSubmit(e) {
    const { name, email, password, password_confirmation } = this.state;
    e.preventDefault();
    axios
      .post(
        'http://localhost:3000/api/v1/registrations',
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        },
        {
          withCredentials: true,
        },
      )
      .then(response => {
        if (response.data.status === 'created') {
          //pushes data into a hsa prop in Apps for other
          //components to access
          // this.props.handleSuccessfulAuth(response.data);
          this.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log('reg error', error);
        this.setState({ registrationErrors: "You're already registered." });
      });
  }
  render() {
    const {
      name,
      email,
      password,
      password_confirmation,
      registrationErrors,
    } = this.state;

    const dispslayErrorMessage = () => (
      <div>
        <h4>
          You're already registered. Were you trying to&nbsp;
          <Link to="/login">Login</Link> instead?.
        </h4>
      </div>
    );
    return (
      <div className="login-bg">
        <div className="sign-up-wrapper">
          <h3 className="login-logo">MentaLLy</h3>
          <p className="login-errors">
            {registrationErrors.length > 0 ? registrationErrors : ''}
          </p>
          <h3 className="login-title">Sign up</h3>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <Field
              label="Name"
              value={name}
              onChange={this.handleChange}
              type="name"
              id="name"
              name="name"
            />
            <Field
              label="E-mail"
              value={email}
              onChange={this.handleChange}
              type="email"
              name="email"
              id="email"
            />
            <Field
              label="Password"
              value={password}
              onChange={this.handleChange}
              type="password"
              name="password"
              id="password"
            />
            <Field
              label="Re-enter password"
              value={password_confirmation}
              onChange={this.handleChange}
              type="password"
              name="password_confirmation"
              id="password_confirmation"
            />
            <Submit
              buttonType="submit"
              buttonText="Sign up"
              linkOne="/login"
              linkOneText="Already signed up?"
              linkTwo="/"
              linkTwoText="Home"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
