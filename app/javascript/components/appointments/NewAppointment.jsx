import React from 'react';
import { Link } from 'react-router-dom';
import FlatPickr from 'flatpickr';

class NewAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: {
        city: '',
        date: null,
        time: null,
      },
      provider: { name: '' },
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
    const { city, date, time } = this.state;

    if (city.length == 0 || date.length == 0 || time.length == 0) return;

    const body = {
      name,
      city,
      date,
      time,
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
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.props.history.push(`/provider/${response.id}`))
      .catch(error => console.log(error.message));
  }
  render() {
    const { provider } = this.state;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Make an appointment with {provider.name}
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="city">City: </label>
                <input
                  type="text"
                  name="name"
                  id="city"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  placeholder="Lagos"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Date">Date:</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
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
                  className="form-control"
                  required
                  placeholder="12 : 35"
                  onChange={this.onChange}
                />
                <small id="logoHelp" className="form-text text-muted">
                  24hr clock
                </small>
              </div>

              <button type="submit" className="btn custom-button mt-3">
                Create appointment
              </button>
              <Link to="/providers" className="btn btn-link mt-3">
                Back to Providers
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAppointment;
