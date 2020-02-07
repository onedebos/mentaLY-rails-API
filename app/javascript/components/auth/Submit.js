import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Submit.css';

const Submit = ({
  buttonType,
  buttonText,
  linkOne,
  linkOneText,
  linkTwo,
  linkTwoText,
}) => {
  return (
    <div>
      <div className="login-btn">
        <button type={buttonType}>{buttonText}</button>
      </div>
      <hr className="hr-3" />
      <div className="back-sign-up">
        <Link to={linkOne}>{linkOneText}</Link>
      </div>
      <div className="forgot">
        <Link to={linkTwo}>{linkTwoText}</Link>
      </div>
    </div>
  );
};

export default Submit;
