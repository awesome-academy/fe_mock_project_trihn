import { useState, type InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import { Eye, EyeOff } from 'lucide-react';
import type {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from 'react-hook-form';

type PropsType<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: FieldError;
    name: Path<T>;
    required?: boolean;
    register: UseFormRegister<T>;
  };

const PasswordInput = <T extends FieldValues>({
  name,
  label,
  className,
  error,
  required,
  disabled,
  register,
  ...props
}: PropsType<T>): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

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
          {...register(name)}
          {...props}
          disabled={disabled}
          type={showPassword ? 'text' : 'password'}
          className={classnames(
            'input input-bordered w-full focus:outline-none focus:border-gray-100 focus:ring focus:ring-100 pr-9',
            { 'border-red-500 focus:ring-red-300': !!error },
            className,
          )}
        />
        {!disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
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
