import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/Index';
import Login from '../auth/Login';

class UserCon extends Component {
  render() {
    {
      console.log(this.props.status);
    }

    return (
      <div>
        <Login loggedInStatus={this.props.status} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, actionCreators)(UserCon);
