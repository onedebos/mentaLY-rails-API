import React, { Component } from 'react';
import axios from 'axios';

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
      <div className="container pt-4 mt-4">
        {LoginErrors}
        <form onSubmit={this.handleSubmit}>
          <input
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
            required
            type="email"
          />

          <input
            name="password"
            placeholder="Enter a password"
            value={password}
            onChange={this.handleChange}
            required
            type="password"
          />
          <button type="submit" className="btn btn-dark">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
