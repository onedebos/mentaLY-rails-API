import React from 'react';
import { Link } from 'react-router-dom';
import Registration from '../components/auth/Registration';

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Mentalee</h1>
        <p className="lead">
          Book appointments with mental health providers across Nigeria.
        </p>
        <hr className="my-4" />
        <Link
          to="/providers"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Providers
        </Link>
        <Registration />
      </div>
    </div>
  </div>
);
