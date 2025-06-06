'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { REPLACE_LOCALE_REGEX } from '@/app/utils/constants';
import { Language } from '@/app/utils/enum';

export default function useLanguage(lng: Language) {
  const router = useRouter();
  const path = usePathname();
  const [language, setLanguage] = useState<Language>(lng);

  const handleLanguage = (lang: Language) => {
    setLanguage(lang);
    const newPath = path.replace(REPLACE_LOCALE_REGEX, lang);
    router.push(newPath);
  };

  return {
    language,
    handleLanguage,
  };
}
