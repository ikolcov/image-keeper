// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyUploads from '../components/MyUploads';
import { myUploadsRequest, uploadsDeleteRequest } from '../redux/modules/my-uploads';
import config from '../config';

class MyUploadsPage extends Component {
  componentDidMount() {
    this.props.myUploadsRequest();
  }
  props: {
    myUploadsRequest: Function,
    uploadsDeleteRequest: Function,
    data: { [key: any]: any }[],
    error: string | null,
    loading: boolean,
    uploadLoading: boolean,
    user: string,
  };
  handleDelete = e => {
    const filename = e.target.dataset.filename;
    this.props.uploadsDeleteRequest(filename);
  };
  render() {
    return (
      <MyUploads
        data={this.props.data}
        error={this.props.error}
        loading={this.props.loading}
        uploadLoading={this.props.uploadLoading}
        imagesRoot={`http://${config.hosts.storage}/api/v1/storage/${this.props.user}/`}
        handleDelete={this.handleDelete}
      />
    );
  }
}

export default connect(
  ({
    myUploads: { data, error, loading },
    upload: { loading: uploadLoading },
    user: { profile: { user } },
  }) => ({
    data,
    error,
    loading,
    uploadLoading,
    user,
  }),
  {
    myUploadsRequest,
    uploadsDeleteRequest,
  },
)(MyUploadsPage);
