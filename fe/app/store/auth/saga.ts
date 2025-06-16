import {
  all,
  call,
  put,
  takeLatest,
  type StrictEffect,
} from 'redux-saga/effects';
import { get, noop } from 'lodash';

import { setRole, setToken } from '@/app/utils/cookie';
import axios from '@/app/lib/axios';
import { StatusCode } from '@/app/utils/enum';
import { LOGIN_ENDPOINT } from '@/app/utils/constants';
import { fetchUserInfoRequest, loginRequest, loginSuccess } from './slice';
import { startLoading, stopLoading } from '../loading/slice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginRequest } from './types';

function* loginRequestSaga(
  action: PayloadAction<LoginRequest>,
): Generator<StrictEffect, void, App.User & { jwt: string }> {
  const {
    payload: { email, password, remember },
    callback,
  } = action.payload;
  const onFailure = get(callback, 'onFailure', noop);
  const onSuccess = get(callback, 'onSuccess', noop);
  const onFinish = get(callback, 'onFinish', noop);

  try {
    yield put(startLoading());
    const { jwt } = yield call(() =>
      axios.post(LOGIN_ENDPOINT, { identifier: email, password }),
    );
    setToken(jwt, remember);

    const user = yield call(() =>
      axios.get('/users/me', {
        params: {
          populate: {
            role: { fields: ['name'] },
            avatar: { fields: ['url'] },
          },
        },
      }),
    );
    setRole(user.role.name, remember);
    yield put(loginSuccess(user));
    onSuccess(user.role.name);
  } catch (error: App.Any) {
    onFailure(
      error.status === StatusCode.FORBIDDEN
        ? 'email_is_not_confirmed_or_registered'
        : 'invalid_email_or_password',
    );
  } finally {
    onFinish();
    yield put(stopLoading());
  }
}

function* fetchUserInfoRequestSaga(): Generator<StrictEffect, void, App.User> {
  try {
    yield put(startLoading());
    const user = yield call(() =>
      axios.get('/users/me', {
        params: {
          populate: {
            role: { fields: ['name'] },
            avatar: { fields: ['url'] },
          },
        },
      }),
    );
    yield put(loginSuccess(user));
  } catch (error: App.Any) {
    //
  } finally {
    yield put(stopLoading());
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(loginRequest.type, loginRequestSaga),
    takeLatest(fetchUserInfoRequest.type, fetchUserInfoRequestSaga),
  ]);
}
