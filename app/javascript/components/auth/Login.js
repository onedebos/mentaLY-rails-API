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
    e.preventDefault();
    axios
      .post(
        'http://localhost:3000/api/v1/sessions',
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
          //pushes data into a hsa prop in Apps for other
          //components to access
          // this.props.handleSuccessfulAuth(response.data);
          this.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log('login error', error);
      });
  }
  render() {
    const { email, password, registrationErrors } = this.state;
    return (
      <div>
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

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
