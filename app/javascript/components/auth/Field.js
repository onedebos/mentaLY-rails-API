import React from 'react';
import '../styles/Field.css';

const Field = ({ label, value, onChange, type, name, id }) => {
  return (
    <div>
      <div className="password-field">
        <label className="label">{label}</label>
        <div className="password-field">
          <input
            value={value}
            onChange={onChange}
            required
            type={type}
            name={name}
            id={id}
            className="field"
          />
        </div>
      </div>
    </div>
  );
};

export default Field;
