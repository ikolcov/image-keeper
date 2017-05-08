import { all } from 'redux-saga/effects';
import auth from './auth';
import upload from './upload';

export default function* rootSaga() {
  yield all([...auth, ...upload]);
}
