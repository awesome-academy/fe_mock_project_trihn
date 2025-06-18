'use client';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import useTheme from '@/app/hooks/use-theme';
import type { Dispatch, SetStateAction, ReactNode, FC } from 'react';

type DropdownProps = {
  label: ReactNode;
  children: (setDropdownOpen: Dispatch<SetStateAction<boolean>>) => ReactNode;
  className?: string;
};

const Dropdown: FC<DropdownProps> = ({
  label,
  children,
  className,
}): JSX.Element => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  // Đóng khi click ngoài
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        dropdown.current &&
        trigger.current &&
        !dropdown.current.contains(target) &&
        !trigger.current.contains(target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Đóng khi nhấn ESC, hoặc điều hướng bằng bàn phím
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        trigger.current?.focus();
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();

        const items =
          dropdown.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
        if (!items || items.length === 0) return;

        const currentIndex = Array.from(items).findIndex(
          (el) => el === document.activeElement,
        );

        let nextIndex = 0;
        if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % items.length;
        } else {
          nextIndex = (currentIndex - 1 + items.length) % items.length;
        }

        items[nextIndex]?.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [dropdownOpen]);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        {label}
      </button>

      <div
        ref={dropdown}
        role="menu"
        className={classNames(
          'origin-top-right z-10 absolute top-full right-0 mt-1 min-w-40 border py-1.5 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-out',
          dropdownOpen
            ? 'opacity-100 scale-100 visible pointer-events-auto'
            : 'opacity-0 scale-95 invisible pointer-events-none',
          isDark
            ? 'bg-gray-800 border-gray-700/60'
            : 'bg-white border-gray-200',
          className,
        )}
      >
        {children(setDropdownOpen)}
      </div>
    </div>
  );
};

export default Dropdown;
