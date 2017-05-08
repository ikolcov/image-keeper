// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import { signupRequest } from '../redux/modules/signup';

class SignupPage extends Component {
  state = {
    user: {
      user: '',
      email: '',
      password: '',
    },
    shouldRedirect: false,
  };

  props: {
    error: string | null,
    signupRequest: Function,
  };

  updateField = (e: SyntheticInputEvent) => {
    e.preventDefault();
    this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } });
  };

  processForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.signupRequest(this.state.user, this.redirectToLogin);
  };

  redirectToLogin = () => this.setState({ shouldRedirect: true });

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to="/login" />;
    }
    return (
      <SignupForm
        updateField={this.updateField}
        processForm={this.processForm}
        form={this.state.user}
        error={this.props.error}
      />
    );
  }
}

export default connect(({ signup }) => ({ error: signup.error }), { signupRequest })(SignupPage);
