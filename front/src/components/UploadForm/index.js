// @flow

import React from 'react';
import './index.css';

type Props = {
  processForm: Function,
  handleAddField: Function,
  formRef: Function,
  fieldsCount: number,
  error: string | null,
  success: boolean,
  loading: boolean,
};

const UploadForm = ({
  processForm,
  handleAddField,
  fieldsCount,
  formRef,
  error,
  success,
  loading,
}: Props) => (
  <div className="Container">
    <h1>Upload your images</h1>
    <form action="" onSubmit={processForm} ref={formRef} className="UploadForm">
      {Array.from({ length: fieldsCount }, (v, i) => i).map(n => (
        <input
          type="file"
          key={n}
          accept="image/*"
          name={`image${n}`}
          className="UploadForm__file"
        />
      ))}
      <button onClick={handleAddField} className="UploadForm__button">+</button>
      <input type="number" name="width" placeholder="Width" className="UploadForm__params" />
      <input type="number" name="height" placeholder="Height" className="UploadForm__params" />
      {error && <p>{error}</p>}
      {loading && <p>Please wait...</p>}
      {success &&
        <p>
          Success! Your
          {' '}
          {fieldsCount > 1 ? 'images have' : 'image has'}
          {' '}
          been successfully uploaded in corresponding size.
        </p>}
      <button type="submit" className="UploadForm__button">Upload</button>
    </form>
  </div>
);

export default UploadForm;
