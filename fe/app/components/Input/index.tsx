import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { X } from 'lucide-react';
import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  control: Control<T>;
  clearable?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  control,
  clearable = true,
  className,
  ...props
}: InputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim();
    field.onChange(trimmed);
    field.onBlur();
  };

  const handleClear = () => {
    field.onChange('');
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="label mb-[2px]">
          <span className="label-text">{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...props}
        {...field}
        onBlur={handleBlur}
        disabled={disabled}
        className={classNames(
          'input input-bordered w-full pr-6 focus:outline-none focus:ring',
          { 'border-red-500 ring-red-300': !!error },
          className,
        )}
      />
      {field.value && clearable && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-[38px] text-gray-500 focus:outline-none"
          aria-label="Clear input"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      {error?.message && (
        <span className="text-sm text-red-500 mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default Input;
