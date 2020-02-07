import React from 'react';
import { Link } from 'react-router-dom';
import statesInNigeria from './statesInNigeria';
import '../styles/NewAppointment.css';

class NewAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      date: null,
      time: null,
      user_id: null,
      provider: { name: '' },
      errors: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ user_id: 1 });

    const url = `/api/v1/providers/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ provider: response }))
      .catch(() => this.props.history.push('/provider'));
  }

  onSubmit(event) {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    event.preventDefault();
    const url = `/api/v1/providers/${id}/appointments`;
    const { city, date, time, user_id } = this.state;
    const { userStatus } = this.props;
    this.setState({ [user_id]: userStatus.id });
    if (city.length == 0 || date.length == 0 || time.length == 0) return;

    const body = {
      city,
      date,
      time,
      user_id,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.ok) {
          this.props.history.push(`/providers`);
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(this.setState({ errors: 'Something went wrong. ' }))
      .catch(error => console.log(error.message));
  }
  render() {
    const { provider, errors } = this.state;
    const displayStatesInNigeria = () =>
      statesInNigeria.map((state, k) => <option key={k}>{state}</option>);
    const displayErrors = () => <div>{errors}</div>;
    const { handleLogin } = this.props;
    return (
      <div className="make-appointment-bg">
        <div className="make-appointment-container">
          <div className="make-appointment-wrapper">
            {errors.length > 0 ? displayErrors() : ''}
            <h1 className="make-appointment-title">
              Make an appointment with {provider.name}
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <select
                  name="city"
                  id="city"
                  required
                  onChange={this.onChange}
                  placeholder="Lagos"
                >
                  {displayStatesInNigeria()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Date">Date:</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  placeholder="12/02/2020"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Time:</label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  required
                  placeholder="12 : 35"
                  onChange={this.onChange}
                />
                <small id="logoHelp">24hr clock</small>
              </div>
              <div className="btn-div">
                <button type="submit" className="make-appointment-btn">
                  Create appointment
                </button>
              </div>
              <div className="btn-link-providers">
                <Link to="/providers" className="btn-link-providers">
                  Back to Providers
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAppointment;
