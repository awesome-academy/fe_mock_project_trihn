'use client';
import { memo, useEffect, useLayoutEffect, useMemo, type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import Input from '@/app/components/Input';
import PasswordInput from '@/app/components/PasswordInput';
import ImageUpload from '@/app/components/ImageUpload';
import Select from '@/app/components/Select';
import DatePicker from '@/app/components/DatePicker';
import Modal from '@/app/components/Modal';
import {
  getUserSchema,
  type UserFormValues,
} from '@/app/validation/userSchema';
import { useTranslation } from '@/app/i18n/client';
import { Gender, I18nNamespace } from '@/app/utils/enum';
import {
  cleanupUser,
  createUserRequest,
  updateUserRequest,
} from '@/app/store/users/slice';
import Button from '@/app/components/Button';
import useTheme from '@/app/hooks/use-theme';
import type { AppState } from '@/app/store';

type UserFormModalProps = {
  onClose: (isFetchUser?: boolean) => void;
} & App.Lang;

const UserFormModal: FC<UserFormModalProps> = ({ onClose, lng }) => {
  const user = useSelector<AppState, UserFormValues & { id?: number }>(
    (state) => state.users.user,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, [
    I18nNamespace.USERS,
    I18nNamespace.VALIDATION,
  ]);
  const { isDark } = useTheme();
  const isEdit = useMemo(() => !!user?.id, [user]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UserFormValues>({
    resolver: zodResolver(getUserSchema(t, isEdit)),
    mode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      gender: '',
      birthDate: null,
      avatar: '',
    },
  });

  const GenderOptions = useMemo(
    () =>
      Object.values(Gender).map((key) => ({
        value: key,
        label: t(key),
      })),
    [t],
  );

  useLayoutEffect(() => {
    if (isEdit) reset(user);
  }, [user, reset, isEdit]);

  const onSubmit = (values: UserFormValues) => {
    const action = user?.id ? updateUserRequest : createUserRequest;
    dispatch(
      action({
        ...(isEdit && { id: user.id }),
        payload: values,
        t,
        callback: {
          onSuccess: () => {
            onClose(true);
          },
          onFailure: (field: keyof UserFormValues, message: string) => {
            setError(field, {
              type: 'server',
              message: t(message),
            });
          },
        },
      }),
    );
  };

  useEffect(() => {
    if (isEdit) {
      return () => {
        dispatch(cleanupUser());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      lng={lng}
      onClose={onClose}
      isDirty={isDirty}
      title={t(isEdit ? 'edit_user' : 'create_user')}
    >
      {(handleRequestClose) => (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-center items-center h-full">
              <Controller
                control={control}
                name="avatar"
                render={({ field }) => (
                  <ImageUpload
                    className="!w-32 !h-32"
                    defaultUrl={
                      user?.avatar?.url
                        ? `${process.env.NEXT_PUBLIC_API_URL}${user?.avatar?.url}`
                        : ''
                    }
                    onChange={(file) => field.onChange(file)}
                    error={
                      typeof errors.avatar?.message === 'string'
                        ? errors.avatar.message
                        : undefined
                    }
                  />
                )}
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 gap-4">
              <Input
                name="username"
                label={t('username')}
                control={control}
                required
              />
              <Input
                name="email"
                label={t('email')}
                control={control}
                disabled={isEdit}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordInput
              name="password"
              label={t('password')}
              control={control}
              disabled={isEdit}
              required
              {...(isEdit && { placeholder: '••••••••' })}
            />
            <Select
              name="gender"
              label={t('gender')}
              required
              register={register}
              error={errors.gender}
              options={GenderOptions}
            />
            <Input
              name="phoneNumber"
              label={t('phone_number')}
              control={control}
            />
            <DatePicker
              control={control}
              name="birthDate"
              label={t('birth_date')}
              error={errors.birthDate}
              maxDate={new Date()}
            />
          </div>

          <div className="modal-action mt-8 flex gap-3">
            <Button
              variant="cancel"
              className={classNames('!rounded-md', {
                '!text-gray-700': !isDark,
              })}
              onClick={handleRequestClose}
              disabled={isSubmitting}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="!rounded-md"
              disabled={isSubmitting || !isDirty}
            >
              {t(isEdit ? 'save' : 'create')}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default memo(UserFormModal);
