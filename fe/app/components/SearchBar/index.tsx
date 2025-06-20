'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import classNames from 'classnames';
import useTheme from '@/app/hooks/use-theme';
import Button from '../Button';
import SearchInput from '../SearchInput';

type SearchBarProps = {
  name: string;
  placeholder?: string;
  addLabel?: string;
  defaultValue: string;
  onSearch: (value: string) => void;
  onAdd?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  name,
  defaultValue,
  placeholder,
  addLabel,
  onSearch,
  onAdd,
}) => {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-end gap-2 mb-6">
      <SearchInput
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onSearch={onSearch}
        className="w-full sm:w-[400px]"
      />
      {onAdd && (
        <Button
          icon={
            <Plus
              className={classNames(
                'w-4 h-4',
                isDark ? 'text-gray-300' : 'text-white',
              )}
            />
          }
          onClick={onAdd}
          size="sm"
          variant="primary"
          className={classNames({ '!text-gray-300': isDark })}
        >
          {addLabel}
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
