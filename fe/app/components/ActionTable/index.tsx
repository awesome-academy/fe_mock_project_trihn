'use client';
import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState, type FC } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { I18nNamespace } from '@/app/utils/enum';

type ActionTableProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  disabled: boolean;
} & App.Lang;

const ActionTable: FC<ActionTableProps> = ({
  disabled,
  lng,
  onEdit,
  onDelete,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(lng, I18nNamespace.COMMON);

  const handleClickOutside = (e: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopover]);

  return (
    <div className="flex gap-1 justify-center">
      {onEdit && (
        <button
          className="btn btn-xs btn-ghost"
          onClick={onEdit}
          aria-label="Edit"
          disabled={disabled}
        >
          <Edit className="w-4 h-4 text-green-500 hover:text-green-600 transition" />
        </button>
      )}
      {onDelete && (
        <>
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => setShowPopover((prev) => !prev)}
            aria-label="Delete"
            disabled={disabled}
          >
            <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600 transition" />
          </button>
          {showPopover && (
            <div
              ref={popoverRef}
              className="fixed z-10 right-0 w-64 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
            >
              <div className="font-semibold mb-2">{t('confirm_delete')}</div>
              <p className="mb-3">{t('are_you_sure')}</p>
              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => setShowPopover(false)}
                >
                  {t('cancel')}
                </button>
                <button
                  className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => {
                    onDelete();
                    setShowPopover(false);
                  }}
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActionTable;
