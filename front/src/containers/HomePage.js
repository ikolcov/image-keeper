// @flow

import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

const HomePage = ({ user }: { user: { user: string } | null }) => <Home user={user} />;

export default connect(({ user }) => ({ user: user.profile }))(HomePage);
