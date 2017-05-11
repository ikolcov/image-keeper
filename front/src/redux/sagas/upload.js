import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../config';
import { uploadSuccess, uploadFailure } from '../modules/upload';
import {
  myUploadsSuccess,
  myUploadsFailure,
  uploadsDeleteSuccess,
  uploadsDeleteFailure,
} from '../modules/my-uploads';
import * as types from '../actiontypes';

function* upload(action) {
  try {
    const user = yield select(state => state.user.profile.user);
    const form = new FormData(action.payload);
    form.append('user', user);
    yield call(axios, {
      method: 'post',
      url: `http://${config.hosts.lb}/`,
      data: form,
      headers: {
        Authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    yield put(uploadSuccess());
  } catch (error) {
    yield put(uploadFailure(error.response ? error.response.data.message : error.message));
  }
}

function* myUploads() {
  try {
    const user = yield select(state => state.user.profile.user);
    const { data } = yield call(axios, {
      method: 'get',
      url: `http://${config.hosts.storage}/api/v1/storage/${user}`,
      headers: {
        Authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    yield put(myUploadsSuccess(data.sort((a, b) => a.uploadDate < b.uploadDate)));
  } catch (error) {
    yield put(myUploadsFailure(error.response ? error.response.data.message : error.message));
  }
}

function* uploadsDelete(action) {
  try {
    const user = yield select(state => state.user.profile.user);
    yield call(axios, {
      method: 'delete',
      url: `http://${config.hosts.storage}/api/v1/storage/${user}/${action.filename}`,
      headers: {
        Authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    yield put(uploadsDeleteSuccess(action.filename));
  } catch (error) {
    yield put(uploadsDeleteFailure(error.response ? error.response.data.message : error.message));
  }
}

function* watchUpload() {
  yield takeEvery(types.UPLOAD_REQUEST, upload);
}

function* watchUploadSuccess() {
  yield takeEvery(types.UPLOAD_SUCCESS, myUploads);
}

function* watchMyUploads() {
  yield takeEvery(types.MY_UPLOADS_REQUEST, myUploads);
}

function* watchUploadsDelete() {
  yield takeEvery(types.UPLOADS_DELETE_REQUEST, uploadsDelete);
}

export default [watchUpload(), watchUploadSuccess(), watchMyUploads(), watchUploadsDelete()];
