import { useState, type InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Eye, EyeOff } from 'lucide-react';
import {
  useController,
  type FieldValues,
  type Path,
  type Control,
} from 'react-hook-form';

type PasswordInputProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    required?: boolean;
    disabled?: boolean;
  };

const PasswordInput = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  className,
  ...props
}: PasswordInputProps<T>): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div>
      {label && (
        <label htmlFor={name} className="label mb-[2px]">
          <span className="label-text">{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          {...field}
          {...props}
          disabled={disabled}
          type={showPassword ? 'text' : 'password'}
          className={classNames(
            'input input-bordered w-full pr-9 focus:outline-none focus:ring',
            { 'border-red-500 ring-red-300': !!error },
            className,
          )}
        />
        {!disabled && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none z-10"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-sm text-red-500 mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default PasswordInput;
