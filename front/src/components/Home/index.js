// @flow

import React from 'react';

const Home = ({ user }: { user: { user: string } | null }) => {
  return (
    <div className="Container">
      <h1>Welcome!</h1>
      <p>{user ? `Welcome again, ${user.user}` : 'Please log in or sign up to continue.'}</p>
    </div>
  );
};

export default Home;
