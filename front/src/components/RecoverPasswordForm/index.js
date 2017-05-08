import React from 'react';

type Props = {
  email: string,
  updateField: Function,
  processForm: Function,
  error: string | null,
  success: boolean,
  loading: boolean,
};

const RecoverPasswordForm = ({
  email,
  updateField,
  processForm,
  error,
  success,
  loading,
}: Props) => (
  <div className="Container">
    <h1>Password recovery</h1>
    <form action="" onSubmit={processForm} className="Form">
      <input
        type="text"
        name="email"
        value={email}
        onChange={updateField}
        placeholder="Enter your email"
        className="Form__input"
      />
      {error && <p>{error}</p>}
      {loading && <p>Please wait...</p>}
      {success &&
        <p>
          Success! If this email exists, you are going to receive confirmation letter within the next few minutes.
        </p>}
      <button type="submit">Recover my password</button>
    </form>
  </div>
);

export default RecoverPasswordForm;
