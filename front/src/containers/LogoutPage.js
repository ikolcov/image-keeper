// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutRequest } from '../redux/modules/user';

class LogoutPage extends Component {
  componentWillMount() {
    if (this.props.user) {
      this.props.logoutRequest();
    }
  }
  props: {
    user: {} | null,
    logoutRequest: Function,
  };
  render() {
    return <Redirect to="/" />;
  }
}

export default connect(({ user }) => ({ user: user.profile }), { logoutRequest })(LogoutPage);
