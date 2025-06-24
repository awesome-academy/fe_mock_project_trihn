import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authReducer from './auth/slice';
import loadingReducer from './loading/slice';
import themeReducer from './theme/slice';
import usersReducer from './users/slice';

const appReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  theme: themeReducer,
  users: usersReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: App.Any,
) => {
  if (action.type === 'RESET_STORE') {
    storage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export default persistReducer(persistConfig, rootReducer);
