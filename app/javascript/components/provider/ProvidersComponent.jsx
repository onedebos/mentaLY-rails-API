import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProvidersComponent.css';

const ProvidersComponent = ({
  imageURL,
  name,
  providerURL,
  appointmentURL,
  alt,
}) => {
  return (
    <div>
      <div className="display-providers-model">
        <div className="img-section">
          <img alt={alt} className="img-section-img" src={imageURL} />
          <p className="providers-name">{name}</p>
        </div>
        <hr />
        <div className="providers-buttons">
          <Link to={providerURL} className="see-more">
            See more
          </Link>
          <Link to={appointmentURL} className="book-appointment">
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProvidersComponent;
