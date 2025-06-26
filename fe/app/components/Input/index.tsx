import classnames from 'classnames';
import { X } from 'lucide-react';
import type {
  FieldError,
  UseFormSetValue,
  FieldValues,
  UseFormRegister,
  Path,
} from 'react-hook-form';
import type { InputHTMLAttributes } from 'react';

type PropsType<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: FieldError;
    name: Path<T>;
    required?: boolean;
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    watch?: (name: Path<T>) => string;
  };

const Input = <T extends FieldValues>({
  name,
  label,
  className,
  error,
  required,
  disabled,
  register,
  setValue,
  watch,
  ...props
}: PropsType<T>): JSX.Element => {
  const { onBlur, ...restRegister } = register(name);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const trimmed = e.target.value.trim();
    setValue(name, trimmed as T[typeof name], { shouldValidate: true });
    onBlur(e);
  };

  const handleClear = (): void => {
    setValue(name, '' as T[typeof name], { shouldValidate: true });
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
        {...restRegister}
        {...props}
        disabled={disabled}
        className={classnames(
          'input input-bordered w-full focus:outline-none focus:border-gray-100 focus:ring focus:ring-100 pr-6',
          { 'border-red-500 focus:ring-red-300': !!error },
          className,
        )}
        onBlur={handleBlur}
      />
      {watch && watch(name) && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute z-10 right-2 top-[38px] text-gray-500 focus:outline-none"
          aria-label="Clear input"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      {error && (
        <span className="text-sm text-red-500 mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default Input;
