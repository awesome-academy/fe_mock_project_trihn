import { memo } from 'react';
import classNames from 'classnames';
import { ChevronDown, FileX } from 'lucide-react';
import { isEmpty } from 'lodash';

import { SortDirection } from '@/app/utils/enum';
import useTheme from '@/app/hooks/use-theme';
import Pagination, { type PaginationProps } from '@/app/components/Pagination';
import type { Key, ReactNode } from 'react';

export type TableColumn<T> = {
  title: string;
  key: keyof T | string;
  sortable?: boolean;
  width?: string | number;
  render?: (item: T) => ReactNode;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  skeletonRows?: number;
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDir?: SortDirection;
  rowKey?: keyof T | string;
  pagination?: PaginationProps;
};

const Table = <T,>({
  columns,
  data,
  loading = false,
  skeletonRows = 10,
  onSort,
  sortKey,
  sortDir,
  rowKey = 'id',
  pagination,
}: TableProps<T>): JSX.Element => {
  const { isDark } = useTheme();

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-base-300">
        <table className="w-full text-sm text-left text-gray-base-hover table">
          <thead
            className={classNames(
              'text-xs uppercase text-gray-700 bg-gray-50',
              { '!bg-gray-700 !text-gray-400': isDark },
            )}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className={classNames('px-6 py-3', {
                    'cursor-pointer select-none': col.sortable,
                  })}
                  onClick={() => col.sortable && onSort(col.key as string)}
                  onKeyDown={(e) => {
                    if (col.sortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onSort(col.key as string);
                    }
                  }}
                  {...(col.sortable && {
                    tabIndex: 0,
                    role: 'columnheader',
                    'aria-sort':
                      sortKey !== col.key
                        ? 'none'
                        : sortDir === SortDirection.ASC
                          ? 'ascending'
                          : 'descending',
                  })}
                >
                  <div className="flex items-center gap-1">
                    {col.title}
                    {col.sortable && (
                      <ChevronDown
                        size={14}
                        className={classNames(
                          'text-gray-500 transition-transform',
                          {
                            'rotate-180':
                              sortKey === col.key &&
                              sortDir === SortDirection.ASC,
                            'opacity-30': sortKey !== col.key,
                          },
                        )}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: skeletonRows }).map((_, i) => (
                <tr
                  key={i}
                  className={classNames('bg-white border-gray-200', {
                    'border-b': skeletonRows - 1 !== i,
                    '!bg-gray-800 !border-gray-700': isDark,
                  })}
                >
                  {columns.map((col, j) => (
                    <td key={j} className="px-6 py-4" width={col.width}>
                      <div className="skeleton h-4 w-full rounded bg-gray-200" />
                    </td>
                  ))}
                </tr>
              ))
            ) : isEmpty(data) ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={classNames(
                    ' text-center py-6',
                    isDark ? 'bg-gray-800' : 'bg-white',
                  )}
                >
                  <FileX className="mx-auto h-16 w-16 text-gray-base" />
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr
                  key={item[rowKey as keyof T] as Key}
                  className={classNames('bg-white border-gray-200', {
                    'border-b': data.length - 1 !== i,
                    '!bg-gray-800 !border-gray-700': isDark,
                  })}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key as string}
                      width={col.width}
                      className="px-6 py-4"
                    >
                      {col.render
                        ? col.render(item)
                        : (item as App.Any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && <Pagination {...pagination} />}
    </>
  );
};

const MemoizedTable = memo(Table) as <T>(props: TableProps<T>) => JSX.Element;

export default MemoizedTable;
