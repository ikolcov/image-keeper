import * as types from '../actiontypes';
import makeReducer from '../helpers/make-reducer';

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const actions = {
  [types.PROCESS_RECOVERY_REQUEST]: () => ({
    success: false,
    loading: true,
    error: null,
  }),
  [types.PROCESS_RECOVERY_SUCCESS]: () => ({
    success: true,
    loading: false,
    error: null,
  }),
  [types.PROCESS_RECOVERY_FAILURE]: (state, { error }) => ({
    success: false,
    loading: false,
    error,
  }),
};

export const processRecoveryRequest = (token, payload) => ({
  type: types.PROCESS_RECOVERY_REQUEST,
  token,
  payload,
});
export const processRecoverySuccess = () => ({
  type: types.PROCESS_RECOVERY_SUCCESS,
});
export const processRecoveryFailure = error => ({
  type: types.PROCESS_RECOVERY_FAILURE,
  error,
});

export default makeReducer(actions, initialState);
