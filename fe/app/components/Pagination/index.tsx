'use client';
import { memo, useEffect, useState, type FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';
import useTheme from '@/app/hooks/use-theme';
import { useTranslation } from '@/app/i18n/client';
import { getPaginationRange } from '@/app/utils/helpers';
import Button from '../Button';

export type PaginationProps = {
  page: number;
  pageSize?: number;
  total: number;
  onChangePage: (page: number) => void;
  onChangePageSize?: (size: number) => void;
  pageSizeOptions?: number[];
  siblingCount?: number;
} & App.Lang;

const Pagination: FC<PaginationProps> = ({
  lng,
  page,
  pageSize = 10,
  total,
  onChangePage,
  onChangePageSize,
  pageSizeOptions = [10, 20, 50, 100],
  siblingCount = 1,
}): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [currentPageSize, setCurrentPageSize] = useState<number>(pageSize);
  const { isDark } = useTheme();
  const { t } = useTranslation(lng, 'common');

  const totalPages = Math.ceil(total / pageSize);
  const range = getPaginationRange(page, totalPages, siblingCount);
  //support when using browser back/next
  useEffect(() => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }

    if (pageSize !== currentPageSize) {
      setCurrentPageSize(pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const handleChangePageSize = (value: number): void => {
    onChangePageSize(value);
    setCurrentPageSize(value);
    setCurrentPage(1);
  };

  const handleChangePage = (value: number): void => {
    setCurrentPage(value);
    onChangePage(value);
  };

  return (
    <div className="flex flex-wrap justify-end items-center gap-2 mt-4">
      {onChangePageSize && (
        <select
          className={classNames(
            'select select-sm w-28 border focus:outline-none transition-colors duration-200 hover:border-violet-500',
            {
              'border-gray-300 text-gray-700 bg-white': !isDark,
              'border-gray-600 text-gray-200 bg-gray-800': isDark,
            },
          )}
          value={currentPageSize}
          onChange={(e) => handleChangePageSize(+e.target.value)}
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt} / {t('page')}
            </option>
          ))}
        </select>
      )}
      <div className="flex items-center justify-center gap-1">
        <Button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage <= 1}
          variant="pagination"
          className={classNames({ '!text-gray-300': isDark })}
          size="sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {range.map((p, i) =>
          p === '...' ? (
            <span key={i} className="btn btn-sm btn-disabled btn-ghost">
              ...
            </span>
          ) : (
            <Button
              key={i}
              className={classNames({
                '!text-gray-300': isDark,
                'bg-violet-500 !text-white': currentPage === p,
              })}
              onClick={() => handleChangePage(p)}
              variant="pagination"
              size="sm"
            >
              {p}
            </Button>
          ),
        )}
        <Button
          className={classNames({ '!text-gray-300': isDark })}
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          variant="pagination"
          size="sm"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default memo(Pagination);
