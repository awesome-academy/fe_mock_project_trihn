'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import classNames from 'classnames';
import { Search } from 'lucide-react';
import useTheme from '@/app/hooks/use-theme';

type SearchInputProps = {
  name?: string;
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
  defaultValue: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  name,
  placeholder,
  onSearch,
  className,
  defaultValue,
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const { isDark } = useTheme();

  const debouncedSearch = useMemo(() => debounce(onSearch, 400), [onSearch]);

  useEffect(() => {
    debouncedSearch(value);
    return () => debouncedSearch.cancel();
  }, [value, debouncedSearch]);

  return (
    <div className={classNames('relative', className)}>
      <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classNames(
          'p-2 ps-10 text-sm border  rounded-lg w-full  focus:border-violet-500 focus:outline-none transition',
          {
            'border-gray-300 bg-gray-50': !isDark,
            'border-gray-600 bg-gray-700  text-white': isDark,
          },
        )}
      />
    </div>
  );
};

export default SearchInput;
