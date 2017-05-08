// @flow

import React from 'react';

type Props = {
  form: {
    /* eslint-disable react/no-unused-prop-types */
    user: string,
    email: string,
    password: string,
    /* eslint-enable react/no-unused-prop-types */
  },
  updateField: Function,
  processForm: Function,
  error: string | null,
};

const SignupForm = ({ form, updateField, processForm, error }: Props) => (
  <div className="Container">
    <h1>Sign up</h1>
    <form action="" onSubmit={processForm} className="Form">
      <input
        type="text"
        name="user"
        onChange={updateField}
        value={form.user}
        placeholder="Login"
        className="Form__input"
      />
      <input
        type="text"
        name="email"
        onChange={updateField}
        value={form.email}
        placeholder="E-mail"
        className="Form__input"
      />
      <input
        type="password"
        name="password"
        onChange={updateField}
        value={form.password}
        placeholder="Password"
        className="Form__input"
      />
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default SignupForm;
