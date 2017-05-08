// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { loginRequest } from '../redux/modules/user';

class LoginPage extends Component {
  state = {
    user: {
      user: '',
      password: '',
    },
    shouldRedirect: false,
  };

  props: {
    signupSuccess: boolean,
    error: string | null,
    loginRequest: Function,
  };

  updateField = (e: SyntheticInputEvent) => {
    e.preventDefault();
    this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } });
  };

  processForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.loginRequest(this.state.user, this.performRedirect);
  };

  performRedirect = () => this.setState({ shouldRedirect: true });

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to="/upload" />;
    }
    return (
      <LoginForm
        updateField={this.updateField}
        processForm={this.processForm}
        form={this.state.user}
        error={this.props.error}
        signupSuccess={this.props.signupSuccess}
      />
    );
  }
}

export default connect(
  ({ signup, user }) => ({
    signupSuccess: signup.success,
    error: user.error,
  }),
  { loginRequest },
)(LoginPage);
