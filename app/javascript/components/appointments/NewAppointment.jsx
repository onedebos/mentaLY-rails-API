import React from 'react';
import { Link } from 'react-router-dom';

class NewAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      date: null,
      time: null,
      user_id: null,
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
    // console.log('user status id', userStatus.id);
    // console.log(city, date, time);
    this.setState({ [user_id]: userStatus.id });
    // console.log('user+id', user_id);
    if (city.length == 0 || date.length == 0 || time.length == 0) return;

    // console.log('submit cicked');

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
          console.log(id);
          this.props.history.push(`/providers`);
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.props.history.push(`/provider/${response.id}`))
      .catch(error => console.log(error.message));
  }
  render() {
    const { provider, user } = this.state;
    const { handleLogin, userStatus } = this.props;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Make an appointment with {provider.name}
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  placeholder="Lagos"
                />
              </div>
              {handleLogin}

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
