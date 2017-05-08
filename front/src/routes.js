// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import requireAuth from './redux/helpers/require-auth-hoc';
import LayoutContainer from './containers/LayoutContainer';
import UploadPage from './containers/UploadPage';
import MyUploadsPage from './containers/MyUploadsPage';
import SignupPage from './containers/SignupPage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import HomePage from './containers/HomePage';
import RecoverPasswordPage from './containers/RecoverPasswordPage';
import ProcessRecoveryPage from './containers/ProcessRecoveryPage';

const Routes = () => (
  <LayoutContainer>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/upload" component={requireAuth(UploadPage)} />
      <Route path="/myuploads" component={requireAuth(MyUploadsPage)} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/logout" component={LogoutPage} />
      <Route
        path="/recover-password/:token?"
        render={({ match }) => {
          if (match.params.token) {
            return <ProcessRecoveryPage token={match.params.token} />;
          }
          return <RecoverPasswordPage />;
        }}
      />
    </Switch>
  </LayoutContainer>
);

export default Routes;
