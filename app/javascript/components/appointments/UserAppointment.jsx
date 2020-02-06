import React from 'react';
import { Link } from 'react-router-dom';

class UserAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      providers: [],
    };
  }

  componentDidMount() {
    const url = '/api/v1/appointments';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ appointments: response }))
      .catch(() => this.props.history.push('/'));

    fetch('/api/v1/providers')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ providers: response }))
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { appointments, providers } = this.state;
    const { userStatus } = this.props;
    const filterWithUserId = appointments.filter(
      appointment => appointment.user_id === userStatus.id,
    );

    const filterProviders = a_id =>
      providers.filter(provider => provider.id === a_id).map(p => p.name);

    {
      // console.log('filter', filterWithUserId);
      // console.log('user', userStatus.admin);
      console.log('Appointment', appointments);

      console.log('providers', filterProviders(10));
    }

    const showUserAppointments = filterWithUserId.map((appointment, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{appointment.city}</h5>
            <p className="card-title">{appointment.date}</p>
            <p className="card-title">{appointment.time}</p>

            <p className="card-title">
              {filterProviders(appointment.provider_id)}
            </p>
          </div>
        </div>
      </div>
    ));

    const showAdminAppointments = appointments.map((appointment, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">City: {appointment.city}</h5>
            <p className="card-title">Date: {appointment.date}</p>
            <p className="card-title">Time: {appointment.time}</p>
            <p className="card-title">
              <strong>With:</strong> {filterProviders(appointment.provider_id)}
            </p>
          </div>
        </div>
      </div>
    ));
    const noAppointments = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No Appointments yet. Why not
          <Link to="/providers"> create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Your appointments</h1>
            <p className="lead text-muted">
              All your appointments, in one place.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              {userStatus.admin === true ? (
                <Link to="/provider" className="btn custom-button">
                  New Provider
                </Link>
              ) : (
                ''
              )}
            </div>
            <div className="text-right mb-3">
              <Link to={`/providers`} className="btn custom-button">
                Back to Providers
              </Link>
            </div>
            <div className="row">
              {filterWithUserId.length > 0 && userStatus.admin === false
                ? showUserAppointments
                : appointments.length > 0 && userStatus.admin === true
                ? showAdminAppointments
                : filterWithUserId.length < 1
                ? noAppointments
                : ''}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default UserAppointment;
