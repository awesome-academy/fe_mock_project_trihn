import { call } from 'redux-saga/effects';
import axios from '@/app/lib/axios';
import { createFormData } from '@/app/utils/helpers';

export function* uploadUserAvatarSaga(userId: number, avatar: File) {
  const formData = createFormData({
    files: avatar,
    ref: 'plugin::users-permissions.user',
    refId: `${userId}`,
    field: 'avatar',
  });

  yield call(() => axios.post('/upload', formData));
}
