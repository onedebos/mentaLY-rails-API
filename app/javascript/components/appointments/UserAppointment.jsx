import React from 'react';
import { Link } from 'react-router-dom';

class UserAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
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
  }

  render() {
    const { appointments } = this.state;
    const { loggedInStatus, userStatus } = this.props;
    const filterWithUserId = appointments.filter(
      appointment => appointment.user_id === userStatus.id,
    );
    {
      console.log('filter', filterWithUserId);
      console.log('user', userStatus.admin);
      console.log('Appointment', appointments);
    }
    const showUserAppointments = filterWithUserId.map((appointment, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{appointment.city}</h5>
            <p className="card-title">{appointment.date}</p>
            <p className="card-title">{appointment.time}</p>
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
                <div>Not admin </div>
              )}
            </div>
            <div className="text-right mb-3">
              <Link to={`/providers`} className="btn custom-button">
                Back to Providers
              </Link>
            </div>
            <div className="row">
              {appointments.length > 0 ? showUserAppointments : noAppointments}
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
