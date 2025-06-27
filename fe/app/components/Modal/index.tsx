'use client';
import {
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type FC,
} from 'react';
import classNames from 'classnames';
import useTheme from '@/app/hooks/use-theme';
import { useTranslation } from '@/app/i18n/client';
import { I18nNamespace } from '@/app/utils/enum';

type ModalProps = {
  children: (handleRequestClose: () => void) => ReactNode;
  title?: string;
  className?: string;
  isDirty?: boolean;
  onClose: () => void;
} & App.Lang;

const Modal: FC<ModalProps> = ({
  title,
  children,
  className,
  lng,
  isDirty = false,
  onClose,
}) => {
  const { isDark } = useTheme();
  const { t } = useTranslation(lng, I18nNamespace.COMMON);
  const [showConfirm, setShowConfirm] = useState(false);

  const requestClose = useCallback(() => {
    if (isDirty) setShowConfirm(true);
    else onClose();
  }, [isDirty, onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        requestClose();
      }
    },
    [requestClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'modal-backdrop') {
      requestClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
    onClose();
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className={classNames(
          'relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-6',
          { '!bg-gray-800 text-white': isDark },
          className,
        )}
      >
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
        {children(requestClose)}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={classNames(
              'p-6 rounded-lg shadow-md max-w-sm w-full',
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
            )}
          >
            <h4 className="text-lg font-semibold mb-4">
              {t('unsaved_changes')}
            </h4>
            <p className="mb-4 text-sm">{t('discard_changes_question')}</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowConfirm(false)} className="btn">
                {t('cancel')}
              </button>
              <button
                onClick={handleConfirmClose}
                className="btn btn-error text-white"
              >
                {t('discard')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
