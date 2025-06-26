import { z } from 'zod';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@/app/utils/constants';
import { zodI18n } from '@/app/utils/helpers';
import type { TFunction } from 'i18next';

export const getUserSchema = (t: TFunction, isEdit: boolean) => {
  const i18n = zodI18n(t);

  return z.object({
    email: z
      .string()
      .trim()
      .nonempty(i18n.required('email'))
      .regex(EMAIL_REGEX, i18n.invalid('email')),
    password: isEdit
      ? z.string().optional()
      : z
          .string()
          .nonempty(i18n.required('password'))
          .min(6, i18n.min('password', 6)),
    username: z
      .string()
      .trim()
      .nonempty(i18n.required('username'))
      .min(3, i18n.min('username', 3)),
    gender: z.string().nonempty(i18n.required('gender')),
    birthDate: z.string().optional(),
    avatar: z.any().optional(),
    phoneNumber: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => !val || PHONE_NUMBER_REGEX.test(val),
        i18n.invalid('phone_number'),
      ),
  });
};

export type UserFormValues = z.infer<ReturnType<typeof getUserSchema>>;
