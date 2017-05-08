// @flow

import React from 'react';
import './index.css';

type Props = {
  data: { [key: any]: any }[],
  loading: boolean,
  uploadLoading: boolean,
  error: string | null,
  imagesRoot: string,
  handleDelete: Function,
};

const MyUploads = ({ imagesRoot, data, loading, uploadLoading, error, handleDelete }: Props) => (
  <div className="Container">
    <h1>My uploads</h1>
    {error && <p>{error}</p>}
    {loading && <p>Please wait...</p>}
    <table className="Uploads">
      <thead>
        <tr>
          <td>File name</td>
          <td>Image format</td>
          <td>Upload date</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {uploadLoading &&
          <tr>
            <td>Please wait for another upload...</td>
            <td />
            <td />
            <td />
          </tr>}
        {data &&
          data.map((i) => ( // eslint-disable-next-line no-underscore-dangle
            <tr key={i._id}>
              <td><a href={imagesRoot + i.filename}>{i.filename}</a></td>
              <td>{i.contentType.slice(i.contentType.lastIndexOf('/') + 1).toUpperCase()}</td>
              <td>
                {new Date(i.uploadDate).toLocaleString('en-US')}
              </td>
              <td><button data-filename={i.filename} onClick={handleDelete}>Delete</button></td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default MyUploads;
