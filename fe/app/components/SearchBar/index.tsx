'use client';
import React, { memo } from 'react';
import { Plus } from 'lucide-react';
import classNames from 'classnames';

import useTheme from '@/app/hooks/use-theme';
import Button from '../Button';
import SearchInput from '../SearchInput';

type SearchBarProps = {
  placeholder?: string;
  addLabel?: string;
  defaultValue: string;
  onSearch: (value: string) => void;
  onAdd?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
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
        placeholder={placeholder}
        defaultValue={defaultValue}
        onSearch={onSearch}
        className="w-full sm:w-[400px]"
      />
      {onAdd && (
        <Button
          icon={<Plus className="w-4 h-4 text-white" />}
          onClick={onAdd}
          size="sm"
          variant="add"
          className={classNames({ '!text-gray-200': isDark })}
        >
          {addLabel}
        </Button>
      )}
    </div>
  );
};

export default memo(SearchBar);
