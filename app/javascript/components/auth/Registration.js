import React, { Component } from 'react';
import axios from 'axios';

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
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
        console.log('response', response);
      })
      .catch(error => {
        console.log('reg error', error);
      });
  }
  render() {
    const { name, email, password, password_confirmation } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={this.handleChange}
            required
          />

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

          <input
            name="password_confirmation"
            placeholder="re-enter your password"
            value={password_confirmation}
            onChange={this.handleChange}
            required
            type="password"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
