// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProcessRecoveryForm from '../components/ProcessRecoveryForm';
import { processRecoveryRequest } from '../redux/modules/process-recovery';

class ProcessRecoveryPage extends Component {
  state = {
    password: '',
  };
  props: {
    token: string,
    processRecoveryRequest: Function,
    loading: boolean,
    success: boolean,
    error: string | null,
  };
  updateField = (e: SyntheticInputEvent) => this.setState({ [e.target.name]: e.target.value });
  processForm = (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.processRecoveryRequest(this.props.token, this.state);
  };
  render() {
    return (
      <ProcessRecoveryForm
        password={this.state.password}
        updateField={this.updateField}
        processForm={this.processForm}
        loading={this.props.loading}
        success={this.props.success}
        error={this.props.error}
      />
    );
  }
}

export default connect(
  ({ processRecovery: { loading, success, error } }) => ({ loading, success, error }),
  { processRecoveryRequest },
)(ProcessRecoveryPage);
