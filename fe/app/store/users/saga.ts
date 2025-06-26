/* eslint-disable max-statements */
import {
  all,
  call,
  put,
  select,
  takeLatest,
  type StrictEffect,
} from 'redux-saga/effects';
import { get, isEmpty, noop, omit } from 'lodash';
import { toast } from 'react-toastify';

import axios from '@/app/lib/axios';
import { createFormData } from '@/app/utils/helpers';
import { StatusCode } from '@/app/utils/enum';
import { startLoading, stopLoading } from '@/app/store/loading/slice';
import { DEFAULT_ROLE_ID } from '@/app/utils/constants';
import {
  createUserRequest,
  deleteUserRequest,
  fetchUserRequest,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUserSuccess,
  toggleUserRequest,
  toggleUserSuccess,
  updateUserRequest,
} from './slice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CreateUserRequest,
  DeleteUserRequest,
  FetchUserRequest,
  FetchUsersRequest,
  FetchUsersResponse,
  ToggleUserRequest,
  UpdateUserRequest,
} from './types';
import type { AppState } from '@/app/store';

const endpoint = '/users';

function* fetchUsersRequestSaga(
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

function* deleteUserRequestSaga(
  action: PayloadAction<DeleteUserRequest>,
): Generator<StrictEffect, void, void> {
  const { id, callback, t } = action.payload;
  const onSuccess = get(callback, 'onSuccess', noop);

  try {
    yield call(() => axios.delete(`${endpoint}/${id}`));
    toast.success(t('delete_success', { entity: t('user') }));
    onSuccess();
  } catch (error: App.Any) {
    //
  }
}

function* toggleUserRequestSaga(
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

function* createUserRequestSaga(
  action: PayloadAction<CreateUserRequest>,
): Generator<StrictEffect, void, { id: number }> {
  yield put(startLoading());
  const { payload, t, callback } = action.payload;
  const onSuccess = get(callback, 'onSuccess', noop);
  const onFailure = get(callback, 'onFailure', noop);
  const onFinish = get(callback, 'onFinish', noop);

  try {
    const { avatar, ...restPayload } = payload;
    const { id } = yield call(() =>
      axios.post(endpoint, { ...restPayload, role: DEFAULT_ROLE_ID }),
    );

    if (avatar?.[0] instanceof File) {
      const avatarForm = createFormData({
        files: avatar[0],
        ref: 'plugin::users-permissions.user',
        refId: `${id}`,
        field: 'avatar',
      });
      yield call(() => axios.post('/upload', avatarForm));
    }

    toast.success(t('create_success', { entity: t('user') }));
    onSuccess();
  } catch (error: App.Any) {
    if (error.status === StatusCode.BAD_REQUEST) {
      const message = error.error.message;
      const field = message.split(' ')[0].toLowerCase();
      onFailure(field, message);
    }
  } finally {
    onFinish();
    yield put(stopLoading());
  }
}

function* fetchUserRequestSaga(
  action: PayloadAction<FetchUserRequest>,
): Generator<StrictEffect, void, Users.User> {
  yield put(startLoading());
  const { id, callback } = action.payload;
  const onFinish = get(callback, 'onFinish', noop);

  try {
    const data = yield call(() =>
      axios.get(`${endpoint}/${id}`, {
        params: {
          populate: {
            role: { fields: ['name'] },
            avatar: { fields: ['url'] },
          },
        },
      }),
    );
    yield put(fetchUserSuccess(data));
  } catch (error: App.Any) {
    //
  } finally {
    onFinish();
    yield put(stopLoading());
  }
}

function* updateUserRequestSaga(
  action: PayloadAction<UpdateUserRequest>,
): Generator<StrictEffect, void, number> {
  yield put(startLoading());
  const { payload, t, callback, id } = action.payload;
  const onSuccess = get(callback, 'onSuccess', noop);
  const onFailure = get(callback, 'onFailure', noop);
  const onFinish = get(callback, 'onFinish', noop);

  try {
    const { avatar, ...restPayload } = omit(payload, ['password', 'email']);
    yield call(() => axios.put(`${endpoint}/${id}`, restPayload));
    const currentAvatarId = yield select(
      (state: AppState) => state.users.user.avatar?.id,
    );

    //change avatar or delete current avatar
    if ((isEmpty(avatar) || avatar?.[0] instanceof File) && currentAvatarId) {
      yield call(() => axios.delete(`/upload/files/${currentAvatarId}`));
    }

    if (avatar?.[0] instanceof File) {
      const avatarForm = createFormData({
        files: avatar[0],
        ref: 'plugin::users-permissions.user',
        refId: `${id}`,
        field: 'avatar',
      });
      yield call(() => axios.post('/upload', avatarForm));
    }

    toast.success(t('update_success', { entity: t('user') }));
    onSuccess();
  } catch (error: App.Any) {
    if (error.status === StatusCode.BAD_REQUEST) {
      const message = error.error.message;
      const field = message.split(' ')[0].toLowerCase();
      onFailure(field, message);
    }
  } finally {
    onFinish();
    yield put(stopLoading());
  }
}

export default function* usersSaga() {
  yield all([
    takeLatest(fetchUsersRequest.type, fetchUsersRequestSaga),
    takeLatest(deleteUserRequest.type, deleteUserRequestSaga),
    takeLatest(toggleUserRequest.type, toggleUserRequestSaga),
    takeLatest(createUserRequest.type, createUserRequestSaga),
    takeLatest(fetchUserRequest.type, fetchUserRequestSaga),
    takeLatest(updateUserRequest.type, updateUserRequestSaga),
  ]);
}
