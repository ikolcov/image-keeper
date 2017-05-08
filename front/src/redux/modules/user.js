import * as types from '../actiontypes';
import makeReducer from '../helpers/make-reducer';

const initialState = {
  profile: null,
  error: null,
};

const actions = {
  [types.LOGIN_REQUEST]: () => initialState,
  [types.LOGIN_SUCCESS]: (state, { profile }) => ({
    profile,
    error: null,
  }),
  [types.LOGIN_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
  [types.LOGOUT_REQUEST]: state => state,
  [types.LOGOUT_SUCCESS]: () => initialState,
};

export const loginRequest = (payload, onSuccess) => ({
  type: types.LOGIN_REQUEST,
  payload,
  onSuccess,
});
export const loginSuccess = profile => ({
  type: types.LOGIN_SUCCESS,
  profile,
});
export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  error,
});
export const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST,
});
export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export default makeReducer(actions, initialState);
