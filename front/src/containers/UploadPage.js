// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import UploadForm from '../components/UploadForm';
import { uploadRequest } from '../redux/modules/upload';

class UploadPage extends Component {
  state = {
    fieldsCount: 1,
  };
  props: {
    uploadRequest: Function,
    error: string | null,
    success: boolean,
    loading: boolean,
  };
  form: HTMLFormElement;

  processForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.uploadRequest(this.form);
  };

  handleAddField = (e: SyntheticEvent) => {
    e.preventDefault();
    this.setState({ fieldsCount: this.state.fieldsCount + 1 });
  };

  render() {
    return (
      <UploadForm
        processForm={this.processForm}
        formRef={f => (this.form = f)}
        error={this.props.error}
        success={this.props.success}
        loading={this.props.loading}
        handleAddField={this.handleAddField}
        fieldsCount={this.state.fieldsCount}
      />
    );
  }
}

export default connect(({ upload: { error, success, loading } }) => ({ error, success, loading }), {
  uploadRequest,
})(UploadPage);
