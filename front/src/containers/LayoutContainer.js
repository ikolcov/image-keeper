// @flow

import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';

type Props = {
  children: {} | null,
  user: { [key: string]: string } | null,
};

const LayoutContainer = ({ children, user }: Props) => <Layout user={user}>{children}</Layout>;

export default connect(({ user }) => ({ user: user.profile }))(LayoutContainer);
