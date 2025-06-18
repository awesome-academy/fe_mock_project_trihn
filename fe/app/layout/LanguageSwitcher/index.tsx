'use client';
import { useRef, type Dispatch, type SetStateAction } from 'react';
import { noop } from 'lodash';
import { ChevronDown } from 'lucide-react';
import classNames from 'classnames';

import Dropdown from '@/app/components/Dropdown';
import useLanguage from '@/app/hooks/use-language';
import { useTranslation } from '@/app/i18n/client';
import useTheme from '@/app/hooks/use-theme';
import { LANGUAGES } from '@/app/utils/constants';

export default function LanguageSwitcher({ lng }: App.Lang) {
  const { language, handleLanguage } = useLanguage(lng);
  const { t } = useTranslation(lng, 'common');
  const dropdownRef = useRef<{
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  }>({ setDropdownOpen: noop });
  const { isDark } = useTheme();
  const LanguageIcon = LANGUAGES[language].icon;

  return (
    <Dropdown
      label={
        <div className="flex items-center gap-1">
          <LanguageIcon />
          <ChevronDown className="shrink-0 ml-1 text-gray-base" size={17} />
        </div>
      }
      className="!min-w-[134px]"
      ref={dropdownRef}
    >
      {Object.values(LANGUAGES).map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            handleLanguage(lang.code);
            dropdownRef.current.setDropdownOpen(false);
          }}
          className={classNames(
            'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2',
            { 'hover:!bg-gray-700': isDark },
          )}
        >
          <lang.icon />
          {t(lang.label)}
        </button>
      ))}
    </Dropdown>
  );
}
