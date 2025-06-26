import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authReducer from './auth/slice';
import loadingReducer from './loading/slice';
import themeReducer from './theme/slice';
import usersReducer from './users/slice';

const persistConfigs = {
  auth: { key: 'auth', storage },
  users: { key: 'users', storage },
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfigs.auth, authReducer),
  users: persistReducer(persistConfigs.users, usersReducer),
  loading: loadingReducer,
  theme: themeReducer,
});

export default rootReducer;
