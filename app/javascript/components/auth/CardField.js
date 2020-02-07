import React from 'react';
import '../styles/CardField.css';

const CardField = ({ infoOne, infoTwo }) => (
  <div>
    <div className="card-block">
      <p className="card-block-info-1">{infoOne}</p>
      <p className="card-block-info-2">{infoTwo}</p>
    </div>
  </div>
);

export default CardField;
