import * as types from '../actiontypes';
import makeReducer from '../helpers/make-reducer';

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const actions = {
  [types.PASSWORD_RECOVERY_REQUEST]: () => ({
    success: false,
    loading: true,
    error: null,
  }),
  [types.PASSWORD_RECOVERY_SUCCESS]: () => ({
    success: true,
    loading: false,
    error: null,
  }),
  [types.PASSWORD_RECOVERY_FAILURE]: (state, { error }) => ({
    success: false,
    loading: false,
    error,
  }),
};

export const passwordRecoveryRequest = payload => ({
  type: types.PASSWORD_RECOVERY_REQUEST,
  payload,
});
export const passwordRecoverySuccess = () => ({
  type: types.PASSWORD_RECOVERY_SUCCESS,
});
export const passwordRecoveryFailure = error => ({
  type: types.PASSWORD_RECOVERY_FAILURE,
  error,
});

export default makeReducer(actions, initialState);
