'use client';
import { memo, useEffect, useRef, useState, type FC } from 'react';
import Image from 'next/image';
import { X, UploadCloud } from 'lucide-react';
import classNames from 'classnames';

type ImageUploadProps = {
  defaultUrl?: string;
  onChange: (file?: File) => void;
  error?: string;
  className?: string;
  width?: number;
  height?: number;
};

const ImageUpload: FC<ImageUploadProps> = ({
  defaultUrl,
  onChange,
  error,
  className,
}) => {
  const [preview, setPreview] = useState<string>(defaultUrl);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onChange(file);
    }
  };

  const handleRemove = (): void => {
    setPreview('');
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      if (preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-start gap-2">
      <div className={classNames('relative group w-24 h-24', className)}>
        {preview ? (
          <>
            <Image
              src={preview}
              alt="image"
              className="object-cover border border-base-300 rounded-full"
              unoptimized
              fill
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition rounded-full z-20"
              aria-label="Change avatar"
            >
              <UploadCloud size={20} />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition z-20"
              aria-label="Remove avatar"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div
            className="w-full h-full border border-dashed border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 cursor-pointer hover:border-violet-500 transition"
            onClick={() => inputRef.current?.click()}
          >
            <UploadCloud size={24} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default memo(ImageUpload);
