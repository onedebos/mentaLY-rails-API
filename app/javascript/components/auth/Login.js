import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import Field from './Field';
import Submit from './Submit';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      LoginErrors: '',
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
    const { email, password } = this.state;
    const { handleLogin, history } = this.props;
    e.preventDefault();
    axios
      .post(
        '/api/v1/sessions',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then(response => {
        if (response.data.status === 'created') {
          this.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        this.setState({
          LoginErrors:
            'The username or password you have entered is incorrect.',
        });
        console.log('login error', error);
      });
  }
  render() {
    const { loggedInStatus } = this.props;
    const { email, password, LoginErrors } = this.state;

    return (
      <div className="login-bg">
        <div className="login-wrapper">
          <p className="login-errors">{LoginErrors}</p>
          <h3 className="login-title">Log in</h3>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <Field
              value={email}
              type="email"
              onChange={this.handleChange}
              label="E-mail"
              name="email"
              id="email"
            />
            <Field
              value={password}
              type="password"
              onChange={this.handleChange}
              label="Password"
              name="password"
              id="password"
            />
            <div className="remember-me">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            {/* <div className="login-btn">
              <button type="submit">Log in</button>
            </div>
            <hr className="hr-3" />
            <div className="back-sign-up">
              <Link to="/sign_up">Sign up</Link>
            </div>
            <div className="forgot">
              <Link to="/">Forgot your password?</Link>
            </div> */}
            <Submit
              buttonType="submit"
              buttonText="Sign in"
              linkOne="/sign_up"
              linkOneText="Sign up"
              linkTwo="/"
              linkTwoText="Forgot your password?"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
