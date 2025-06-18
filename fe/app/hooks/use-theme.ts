'use client';
import { useDispatch, useSelector } from 'react-redux';
import { Theme } from '@/app/utils/enum';
import { THEME } from '@/app/utils/constants';
import { setCurrentTheme } from '@/app/store/theme/slice';
import type { AppState } from '@/app/store';

export default function useTheme() {
  const dispatch = useDispatch();
  const theme = useSelector<AppState, Theme>((state) => state.theme);

  const toggleTheme = (): void => {
    const toggle = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    document.documentElement.setAttribute('data-theme', toggle);
    localStorage.setItem(THEME, toggle);
    dispatch(setCurrentTheme(toggle));
  };

  return {
    isDark: theme === Theme.DARK,
    toggleTheme,
  };
}
