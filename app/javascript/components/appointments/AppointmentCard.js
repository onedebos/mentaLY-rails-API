import React from 'react';
import '../styles/AppointmentCard.css';

const AppointmentCard = ({ pName, appDate, appTime, appLocation }) => (
  <div>
    <div className="card-wrapper">
      <div className="p-name">{pName}</div>
      <div className="app-date-div">
        <p className="app-date-text">Date:&nbsp;</p>
        {appDate}
      </div>
      <div className="app-time-div">
        <p className="app-time-text">Time:&nbsp;</p>
        {appTime}
      </div>
      <div className="app-location-div">
        <p className="app-location-text">Location:&nbsp;</p>
        {appLocation}
      </div>
    </div>
  </div>
);

export default AppointmentCard;
