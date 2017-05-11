import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import config from '../../config';
import { signupSuccess, signupFailure } from '../modules/signup';
import { loginSuccess, loginFailure, logoutSuccess } from '../modules/user';
import { passwordRecoverySuccess, passwordRecoveryFailure } from '../modules/recover-password';
import { processRecoverySuccess, processRecoveryFailure } from '../modules/process-recovery';
import * as types from '../actiontypes';

const ROOT_URL = `http://${config.hosts.sso}/api/v1/auth`;

function* signup(action) {
  try {
    yield call(axios.post, `${ROOT_URL}/signup`, action.payload);
    yield put(signupSuccess());
    if (action.onSuccess) {
      yield action.onSuccess();
    }
  } catch (error) {
    yield put(signupFailure(error.response ? error.response.data.message : error.message));
  }
}

function* login(action) {
  try {
    const res = yield call(axios.post, `${ROOT_URL}/login`, action.payload);
    const { accessToken, refreshToken, profile } = res.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    yield put(loginSuccess(profile));
    if (action.onSuccess) {
      yield action.onSuccess();
    }
  } catch (error) {
    yield put(loginFailure(error.response ? error.response.data.message : error.message));
  }
}

function* logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  yield put(logoutSuccess());
}

function* recover(action) {
  try {
    yield call(axios.post, `${ROOT_URL}/recover-password`, action.payload);
    yield put(passwordRecoverySuccess());
  } catch (error) {
    yield put(
      passwordRecoveryFailure(error.response ? error.response.data.message : error.message),
    );
  }
}

function* processRecovery(action) {
  try {
    yield call(axios.post, `${ROOT_URL}/recover-password/${action.token}`, action.payload);
    yield put(processRecoverySuccess());
  } catch (error) {
    yield put(processRecoveryFailure(error.response ? error.response.data.message : error.message));
  }
}

function* watchSignup() {
  yield takeEvery(types.SIGNUP_REQUEST, signup);
}

function* watchLogin() {
  yield takeEvery(types.LOGIN_REQUEST, login);
}

function* watchLogout() {
  yield takeEvery(types.LOGOUT_REQUEST, logout);
}

function* watchRecover() {
  yield takeEvery(types.PASSWORD_RECOVERY_REQUEST, recover);
}

function* watchProcessRecovery() {
  yield takeEvery(types.PROCESS_RECOVERY_REQUEST, processRecovery);
}

function* rememberUser() {
  if (localStorage.accessToken && localStorage.refreshToken) {
    try {
      const lsAccessToken = localStorage.getItem('accessToken');
      const { sub, email, exp } = jwtDecode(lsAccessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > exp) {
        const lsRefreshToken = localStorage.getItem('refreshToken');
        const payload = { user: sub, token: lsRefreshToken };
        const res = yield call(axios.post, `${ROOT_URL}/login/refresh`, payload);
        const { accessToken, refreshToken, profile } = res.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        yield put(loginSuccess(profile));
      } else {
        yield put(loginSuccess({ user: sub, email }));
      }
    } catch (error) {
      yield put(loginFailure(error.response ? error.response.data.message : error.message));
    }
  }
}

export default [
  watchSignup(),
  watchLogin(),
  watchLogout(),
  watchRecover(),
  watchProcessRecovery(),
  rememberUser(),
];
