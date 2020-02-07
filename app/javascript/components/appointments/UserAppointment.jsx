import React from 'react';
import { Link } from 'react-router-dom';
import DisplayAllTitles from '../auth/DisplayAllTtitles';
import AppointmentCard from './AppointmentCard';
import '../styles/UserAppointments.css';

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

    const showUserAppointments = filterWithUserId.map((appointment, index) => (
      <AppointmentCard
        key={index}
        pName={filterProviders(appointment.provider_id)}
        appTime={appointment.time}
        appLocation={appointment.city}
        appDate={appointment.date}
      />
    ));

    const showAdminAppointments = appointments.map((appointment, index) => (
      <AppointmentCard
        key={appointment.id}
        pName={filterProviders(appointment.provider_id)}
        appTime={appointment.time}
        appLocation={appointment.city}
        appDate={appointment.date}
      />
    ));

    const noAppointments = (
      <div className="">
        <h4 className="no-appointments">
          No Appointments yet. Why not
          <Link to="/providers"> create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <div>
          <DisplayAllTitles
            main="YOUR APPOINTMENTS"
            sub="All your appointments in one place."
          />
          <div className="grid-for-appointments-list">
            {filterWithUserId.length > 0 && userStatus.admin === false
              ? showUserAppointments
              : appointments.length > 0 && userStatus.admin === true
              ? showAdminAppointments
              : filterWithUserId.length < 1
              ? noAppointments
              : ''}
          </div>
        </div>
      </>
    );
  }
}

export default UserAppointment;
