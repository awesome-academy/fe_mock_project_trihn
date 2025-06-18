'use client';
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import useTheme from '@/app/hooks/use-theme';

type DropdownProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

export type DropdownRef = {
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

// eslint-disable-next-line react/display-name
const Dropdown = forwardRef<DropdownRef, DropdownProps>(
  ({ label, children, className }, ref): JSX.Element => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLDivElement>(null);
    const { isDark } = useTheme();

    useImperativeHandle(ref, () => ({ setDropdownOpen }), []);

    // Close dropdown on outside click
    useEffect(() => {
      const clickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!dropdown.current || !trigger.current) return;
        if (
          dropdownOpen &&
          !dropdown.current.contains(target) &&
          !trigger.current.contains(target)
        ) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
    }, [dropdownOpen]);

    // Close dropdown on ESC key
    useEffect(() => {
      const keyHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setDropdownOpen(false);
        }
      };
      document.addEventListener('keydown', keyHandler);
      return () => document.removeEventListener('keydown', keyHandler);
    }, []);

    return (
      <div className="relative inline-flex">
        <button
          ref={trigger}
          className="inline-flex justify-center items-center group"
          aria-haspopup="true"
          onClick={() => setDropdownOpen((prev) => !prev)}
          aria-expanded={dropdownOpen}
        >
          {label}
        </button>
        {/* Dropdown menu */}
        <div
          ref={dropdown}
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
          {children}
        </div>
      </div>
    );
  },
);

export default Dropdown;
