import * as types from '../actiontypes';
import makeReducer from '../helpers/make-reducer';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const actions = {
  [types.MY_UPLOADS_REQUEST]: () => ({
    data: [],
    loading: true,
    error: null,
  }),
  [types.MY_UPLOADS_SUCCESS]: (state, { data }) => ({
    data,
    loading: false,
    error: null,
  }),
  [types.MY_UPLOADS_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
  [types.UPLOADS_DELETE_REQUEST]: state => state,
  [types.UPLOADS_DELETE_SUCCESS]: (state, { filename }) => ({
    ...state,
    data: [...state.data.filter(image => image.filename !== filename)],
  }),
  [types.UPLOADS_DELETE_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
};

export const myUploadsRequest = () => ({
  type: types.MY_UPLOADS_REQUEST,
});
export const myUploadsSuccess = data => ({
  type: types.MY_UPLOADS_SUCCESS,
  data,
});
export const myUploadsFailure = error => ({
  type: types.MY_UPLOADS_FAILURE,
  error,
});
export const uploadsDeleteRequest = filename => ({
  type: types.UPLOADS_DELETE_REQUEST,
  filename,
});
export const uploadsDeleteSuccess = filename => ({
  type: types.UPLOADS_DELETE_SUCCESS,
  filename,
});
export const uploadsDeleteFailure = error => ({
  type: types.UPLOADS_DELETE_FAILURE,
  error,
});

export default makeReducer(actions, initialState);
