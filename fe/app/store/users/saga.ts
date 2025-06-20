import {
  all,
  call,
  put,
  takeLatest,
  type StrictEffect,
} from 'redux-saga/effects';
import { get, noop } from 'lodash';
import { toast } from 'react-toastify';

import axios from '@/app/lib/axios';
import {
  deleteUserRequest,
  fetchUsersRequest,
  fetchUsersSuccess,
  toggleUserRequest,
  toggleUserSuccess,
} from './slice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  DeleteUserRequest,
  FetchUsersRequest,
  FetchUsersResponse,
  ToggleUserRequest,
} from './types';

const endpoint = '/users';

function* FetchUsersRequestSaga(
  action: PayloadAction<FetchUsersRequest>,
): Generator<StrictEffect, void, FetchUsersResponse> {
  const { params, callback } = action.payload;
  const onFinish = get(callback, 'onFinish', noop);

  try {
    const {
      data,
      meta: { pagination },
    } = yield call(() => axios.get(endpoint, { params }));
    yield put(fetchUsersSuccess({ data, pagination }));
  } catch (error: App.Any) {
    //
  } finally {
    onFinish();
  }
}

function* DeleteUserRequestSaga(
  action: PayloadAction<DeleteUserRequest>,
): Generator<StrictEffect, void, void> {
  const { id, callback, t } = action.payload;
  const onSuccess = get(callback, 'onSuccess', noop);

  try {
    yield call(() => axios.delete(`${endpoint}/${id}`));
    toast.success(t('user_deleted'));
    onSuccess();
  } catch (error: App.Any) {
    //
  }
}

function* ToggleUserRequestSaga(
  action: PayloadAction<ToggleUserRequest>,
): Generator<StrictEffect, void, void> {
  const { id, field, value, t } = action.payload;

  try {
    yield call(() =>
      axios.put(`${endpoint}/${id}`, {
        [field]: value,
      }),
    );
    yield put(toggleUserSuccess(action.payload));
    toast.success(t('user_status_updated', { field: t(field).toLowerCase() }));
  } catch (error: App.Any) {
    //
  }
}

export default function* usersSaga() {
  yield all([
    takeLatest(fetchUsersRequest.type, FetchUsersRequestSaga),
    takeLatest(deleteUserRequest.type, DeleteUserRequestSaga),
    takeLatest(toggleUserRequest.type, ToggleUserRequestSaga),
  ]);
}
