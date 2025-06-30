/* eslint-disable max-statements */
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
  deleteMovieRequest,
  fetchMoviesRequest,
  fetchMoviesSuccess,
} from './slice';

import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  DeleteMovieRequest,
  FetchMoviesRequest,
  FetchMoviesResponse,
} from './types';

const endpoint = '/movies';

function* fetchMoviesRequestSaga(
  action: PayloadAction<FetchMoviesRequest>,
): Generator<StrictEffect, void, FetchMoviesResponse> {
  const {
    params: { search, sort, ...pagination },
    callback,
  } = action.payload;
  const onFinish = get(callback, 'onFinish', noop);

  try {
    const { data, meta } = yield call(() =>
      axios.get(endpoint, {
        params: {
          pagination: pagination,
          sort,
          filters: {
            $or: [
              { title: { $containsi: search } },
              { description: { $containsi: search } },
            ],
          },
          populate: {
            poster: true,
            genres: { fields: ['name'] },
          },
        },
      }),
    );
    yield put(fetchMoviesSuccess({ data, pagination: meta.pagination }));
  } catch (error: App.Any) {
    //
  } finally {
    onFinish();
  }
}

function* deleteMovieRequestSaga(
  action: PayloadAction<DeleteMovieRequest>,
): Generator<StrictEffect, void, void> {
  const { id, callback, t } = action.payload;
  const onSuccess = get(callback, 'onSuccess', noop);

  try {
    yield call(() => axios.delete(`${endpoint}/${id}`));
    toast.success(t('delete_success', { entity: t('movie') }));
    onSuccess();
  } catch (error: App.Any) {
    //
  }
}

export default function* MoviesSaga() {
  yield all([
    takeLatest(fetchMoviesRequest.type, fetchMoviesRequestSaga),
    takeLatest(deleteMovieRequest.type, deleteMovieRequestSaga),
  ]);
}
