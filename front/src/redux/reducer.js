import { combineReducers } from 'redux';
import signup from './modules/signup';
import user from './modules/user';
import recover from './modules/recover-password';
import processRecovery from './modules/process-recovery';
import upload from './modules/upload';
import myUploads from './modules/my-uploads';

const rootReducer = combineReducers({
  signup,
  user,
  recover,
  processRecovery,
  upload,
  myUploads,
});

export default rootReducer;
