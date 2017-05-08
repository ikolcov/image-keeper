// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecoverPasswordForm from '../components/RecoverPasswordForm';
import { passwordRecoveryRequest } from '../redux/modules/recover-password';

class RecoverPasswordPage extends Component {
  state = {
    email: '',
  };
  props: {
    passwordRecoveryRequest: (payload: { email: string }) => any,
    error: string | null,
    success: boolean,
    loading: boolean,
  };
  updateField = (e: SyntheticInputEvent) => this.setState({ [e.target.name]: e.target.value });
  processForm = (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.passwordRecoveryRequest(this.state);
  };
  render() {
    return (
      <RecoverPasswordForm
        email={this.state.email}
        updateField={this.updateField}
        processForm={this.processForm}
        error={this.props.error}
        success={this.props.success}
        loading={this.props.loading}
      />
    );
  }
}

export default connect(
  ({ recover: { error, success, loading } }) => ({ error, success, loading }),
  {
    passwordRecoveryRequest,
  },
)(RecoverPasswordPage);
