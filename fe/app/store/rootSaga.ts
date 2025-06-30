import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import usersSaga from './users/saga';
import moviesSaga from './movies/saga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(usersSaga), fork(moviesSaga)]);
}
