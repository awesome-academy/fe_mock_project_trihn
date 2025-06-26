'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';

import { useTranslation } from '@/app/i18n/client';
import { getLoginSchema, LoginFormValues } from '@/app/validation/loginSchema';
import Input from '@/app/components/Input';
import PasswordInput from '@/app/components/PasswordInput';
import { loginRequest } from '@/app/store/auth/slice';
import Button from '@/app/components/Button';
import { routes } from '@/app/utils/routes';
import { I18nNamespace, Role } from '@/app/utils/enum';
import { REDIRECT_TO } from '@/app/utils/constants';
import { getPathname } from '@/app/utils/helpers';
import { AppState } from '@/app/store';
import type { FC } from 'react';

const AdminLoginContainer: FC<App.Lang> = ({ lng }) => {
  const { t } = useTranslation(lng, [
    I18nNamespace.LOGIN,
    I18nNamespace.VALIDATION,
  ]);
  const router = useRouter();
  const isLoggedIn = useSelector<AppState, boolean>(
    (state) => state.auth.isLoggedIn,
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginSchema(t)),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: { remember: false },
  });

  const onSubmit = (data: LoginFormValues) => {
    dispatch(
      loginRequest({
        payload: data,
        callback: {
          onFailure: (message: string) => {
            setError('email', {
              type: 'server',
              message: t(message),
            });
          },
          onSuccess: (role: Role) => {
            const redirectTo = getCookie(REDIRECT_TO);
            if (redirectTo) {
              deleteCookie(REDIRECT_TO);
              router.push(redirectTo);
            } else {
              router.push(
                getPathname(
                  lng,
                  role === Role.ADMIN ? routes.DASHBOARD : routes.HOME,
                ),
              );
            }
          },
        },
      }),
    );
  };

  if (isLoggedIn) return <p />;

  return (
    <section className="min-h-screen bg-base-100 flex items-center justify-center px-6 py-8">
      <div className="card w-full max-w-md shadow-xl bg-base-200">
        <div className="card-body space-y-4">
          <h1 className="text-2xl font-bold text-center text-base-content">
            {t('sign_in_to_your_account')}
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              label={t('email')}
              placeholder="user@gmail.com"
              required
              register={register}
              error={errors.email}
              setValue={setValue}
            />
            <PasswordInput
              name="password"
              label={t('password')}
              placeholder="••••••••"
              required
              register={register}
              error={errors.password}
            />
            <div className="flex items-center justify-between">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm text-white checked:bg-primary-500 checked:border-primary-500"
                  {...register('remember')}
                />
                <span className="label-text">{t('remember_me')}</span>
              </label>
              <Link
                href={getPathname(lng, routes.FORGOT_PASSWORD)}
                className="text-sm text-primary hover:underline text-primary-500"
              >
                {`${t('forgot_password')}?`}
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {t('sign_in')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLoginContainer;
