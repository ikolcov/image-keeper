// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  form: {
    /* eslint-disable react/no-unused-prop-types */
    user: string,
    password: string,
    /* eslint-enable react/no-unused-prop-types */
  },
  updateField: Function,
  processForm: Function,
  error: string | null,
  signupSuccess: boolean,
};

const LoginForm = ({ form, updateField, processForm, error, signupSuccess }: Props) => (
  <div className="Container">
    <h1>Login</h1>
    <form action="" onSubmit={processForm} className="Form">
      {signupSuccess && <p>You are successfully registered and can now log in!</p>}
      <input
        type="text"
        name="user"
        placeholder="Login"
        onChange={updateField}
        value={form.user}
        className="Form__input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={updateField}
        value={form.password}
        className="Form__input"
      />
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
      <p>Forgot password? <Link to="/recover-password">Click here!</Link></p>
    </form>
  </div>
);

export default LoginForm;
