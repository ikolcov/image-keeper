// @flow

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './index.css';

type Props = {
  children?: {} | null,
  user: { [key: string]: string } | null,
};

const Layout = ({ user, children }: Props) => (
  <div className="Layout">
    <Header user={user} />
    {children}
    <Footer />
  </div>
);

Layout.defaultProps = {
  children: null,
};

export default Layout;
