import {
  createInstance,
  Namespace,
  FlatNamespace,
  KeyPrefix,
  type i18n,
  type TFunction,
} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next, FallbackNs } from 'react-i18next';
import { getOptions } from './settings';

const initI18next = async (
  lng: string,
  ns: string | string[],
): Promise<i18n> => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
  lng: string,
  ns?: Ns,
  options: { keyPrefix?: KPrefix } = {},
): Promise<{
  t: TFunction<Namespace, KPrefix>;
  i18n: i18n;
}> {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns as string[]) : (ns as string),
  );
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
