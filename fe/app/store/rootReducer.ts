import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authReducer from './auth/slice';
import loadingReducer from './loading/slice';
import themeReducer from './theme/slice';
import usersReducer from './users/slice';
import moviesReducer from './movies/slice';

const persistConfigs = {
  auth: { key: 'auth', storage },
  users: { key: 'users', storage },
  movies: { key: 'movies', storage },
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfigs.auth, authReducer),
  users: persistReducer(persistConfigs.users, usersReducer),
  movies: persistReducer(persistConfigs.movies, moviesReducer),
  loading: loadingReducer,
  theme: themeReducer,
});

export default rootReducer;
