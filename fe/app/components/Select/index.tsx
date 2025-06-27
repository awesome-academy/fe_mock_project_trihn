import classnames from 'classnames';
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import type { SelectHTMLAttributes } from 'react';

type PropsType<T extends FieldValues> =
  SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    name: Path<T>;
    error?: FieldError;
    required?: boolean;
    options?: { value: string | number; label: string }[];
    defaultOptionLabel?: string;
    register: UseFormRegister<T>;
  };

const Select = <T extends FieldValues>({
  name,
  label,
  required,
  className,
  error,
  defaultOptionLabel,
  options = [],
  register,
  ...props
}: PropsType<T>): JSX.Element => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="label mb-[2px]">
          <span className="label-text">{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        {...register(name)}
        {...props}
        className={classnames(
          'select w-full focus:outline-none focus:border-gray-100 focus:ring focus:ring-100',
          { 'border-red-500 focus:ring-red-300': !!error },
          className,
        )}
      >
        {defaultOptionLabel && <option value="">{defaultOptionLabel}</option>}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error?.message && (
        <span className="text-sm text-red-500 mt-1 block">{error.message}</span>
      )}
    </div>
  );
};

export default Select;
