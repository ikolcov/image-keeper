// @flow

import React from 'react';

type Props = {
  password: string,
  updateField: Function,
  processForm: Function,
  loading: boolean,
  success: boolean,
  error: string | null,
};

const ProcessRecoveryForm = ({
  password,
  updateField,
  processForm,
  loading,
  success,
  error,
}: Props) => (
  <div className="Container">
    <h1>Changing password</h1>
    <form action="" onSubmit={processForm} className="Form">
      <input
        type="password"
        name="password"
        value={password}
        onChange={updateField}
        placeholder="Enter new password"
        className="Form__input"
      />
      {error && <p>{error}</p>}
      {loading && <p>Please wait...</p>}
      {success &&
        <p>
          Your password was changed! Now you can log in with your new credentials.
        </p>}
      <button type="submit">Change the password</button>
    </form>
  </div>
);

export default ProcessRecoveryForm;
