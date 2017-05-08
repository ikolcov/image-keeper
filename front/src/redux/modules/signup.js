import * as types from '../actiontypes';
import makeReducer from '../helpers/make-reducer';

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const actions = {
  [types.SIGNUP_REQUEST]: () => ({
    success: false,
    loading: true,
    error: null,
  }),
  [types.SIGNUP_SUCCESS]: () => ({
    success: true,
    loading: false,
    error: null,
  }),
  [types.SIGNUP_FAILURE]: (state, { error }) => ({
    success: false,
    loading: false,
    error,
  }),
};

export const signupRequest = (payload, onSuccess) => ({
  type: types.SIGNUP_REQUEST,
  payload,
  onSuccess,
});
export const signupSuccess = () => ({
  type: types.SIGNUP_SUCCESS,
});
export const signupFailure = error => ({
  type: types.SIGNUP_FAILURE,
  error,
});

export default makeReducer(actions, initialState);
