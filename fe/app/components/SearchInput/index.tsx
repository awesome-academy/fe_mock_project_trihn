'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Search, X } from 'lucide-react';
import useTheme from '@/app/hooks/use-theme';

type SearchInputProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
  defaultValue: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  className,
  defaultValue,
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isDark } = useTheme();

  //support when using browser back/next
  useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const triggerSearch = useCallback(
    (val: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onSearch(val);
      }, 300);
    },
    [onSearch],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerSearch(value);
    }
  };

  return (
    <div className={classNames('relative', className)}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={classNames(
          'py-2 pl-4 pr-[60px] text-sm border rounded-lg w-full hover:border-violet-500 focus:border-violet-500 focus:outline-none transition',
          {
            'border-gray-300 bg-gray-50': !isDark,
            'border-gray-600 bg-gray-700 text-white': isDark,
          },
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          className="absolute inset-y-0 right-8 px-2 text-gray-500 focus:outline-none"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      <button
        type="button"
        onClick={() => triggerSearch(value)}
        className="absolute inset-y-0 right-0 pl-2 pr-3 text-sm text-violet-500"
      >
        <Search className="w-5 h-5 text-gray-500 hover:text-violet-500" />
      </button>
    </div>
  );
};

export default SearchInput;
