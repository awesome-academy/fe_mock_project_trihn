import { z } from 'zod';
import { EMAIL_REGEX } from '@/app/utils/constants';
import { zodI18n } from '@/app/utils/helpers';
import type { TFunction } from 'i18next';

export const getLoginSchema = (t: TFunction) => {
  const i18n = zodI18n(t);

  return z.object({
    email: z
      .string()
      .trim()
      .nonempty(i18n.required('email'))
      .regex(EMAIL_REGEX, i18n.invalid('email')),
    password: z
      .string()
      .nonempty(i18n.required('password'))
      .min(6, i18n.min('password', 6)),
    remember: z.boolean().optional(),
  });
};

export type LoginFormValues = z.infer<ReturnType<typeof getLoginSchema>>;
