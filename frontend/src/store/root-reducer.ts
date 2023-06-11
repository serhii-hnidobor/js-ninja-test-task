import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as hero } from './hero/reducer';

const rootReducer = combineReducers({
  auth,
  hero,
});

export { rootReducer };
