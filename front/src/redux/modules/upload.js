import * as types from '../actiontypes';
import makeReducer from '../helpers/make-reducer';

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const actions = {
  [types.UPLOAD_REQUEST]: () => ({
    success: false,
    loading: true,
    error: null,
  }),
  [types.UPLOAD_SUCCESS]: () => ({
    success: true,
    loading: false,
    error: null,
  }),
  [types.UPLOAD_FAILURE]: (state, { error }) => ({
    success: false,
    loading: false,
    error,
  }),
};

export const uploadRequest = payload => ({
  type: types.UPLOAD_REQUEST,
  payload,
});
export const uploadSuccess = () => ({
  type: types.UPLOAD_SUCCESS,
});
export const uploadFailure = error => ({
  type: types.UPLOAD_FAILURE,
  error,
});

export default makeReducer(actions, initialState);
