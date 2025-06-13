import { combineReducers } from 'redux';
import authReducer from './auth/slice';
import loadingReducer from './loading/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
