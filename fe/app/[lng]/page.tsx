'use client';
import useLanguage from '@/app/hooks/use-language';
import { useTranslation } from '@/app/i18n/client';
import { Language, Theme } from '@/app/utils/enum';
import type { FC } from 'react';

//TODO
const Home: FC<App.LanguageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng);
  const { handleLanguage } = useLanguage(lng);

  const toggleTheme = () => {
    const html = document.documentElement;
    const theme = html.getAttribute('data-theme');
    const toggleTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    html.setAttribute('data-theme', toggleTheme);
    localStorage.setItem('theme', toggleTheme);
  };

  return (
    <div>
      <div>{t('save')}</div>
      <button
        className="rounded-box bg-base-100 text-base-content p-2 shadow"
        onClick={() => handleLanguage(Language.VI)}
      >
        Vi
      </button>
      <button
        className="rounded-box bg-base-100 text-base-content p-2 shadow"
        onClick={() => handleLanguage(Language.EN)}
      >
        En
      </button>
      <div className="rounded-box bg-base-100 text-base-content p-2">
        Theme should apply here
      </div>
      <button
        className="rounded-box bg-base-100 text-base-content p-2 shadow"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default Home;
