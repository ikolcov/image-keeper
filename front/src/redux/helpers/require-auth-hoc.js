// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function(ComposedComponent: any) {
  class Authentication extends Component {
    state = {
      shouldRedirect: false,
    };
    componentWillMount() {
      if (!this.props.user) {
        this.setState({shouldRedirect: true})
      }
    }
    componentWillReceiveProps(nextProps) {
      if (!nextProps.user) {
        this.setState({shouldRedirect: true})
      }
    }
    props: {
      user: {} | null,
    };
    render() {
      if (this.state.shouldRedirect) {
        return <Redirect to="/login" />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }
  return connect(({ user }) => ({ user: user.profile }))(Authentication);
}
