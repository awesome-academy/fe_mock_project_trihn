import classnames from 'classnames';
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
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
  };

const Input = <T extends FieldValues>({
  name,
  label,
  className,
  error,
  register,
  setValue,
  ...props
}: PropsType<T>): JSX.Element => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const trimmed = e.target.value.trim();
    setValue(name, trimmed as T[typeof name], { shouldValidate: true });
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="label mb-[2px]">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        {...register(name)}
        {...props}
        id={name}
        name={name}
        className={classnames(
          'input input-bordered w-full focus:outline-none focus:border-gray-100 focus:ring focus:ring-100',
          { 'border-red-500 focus:ring-red-300': !!error },
          className,
        )}
        onBlur={handleBlur}
      />
      {error && (
        <span className="text-sm text-red-500 mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default Input;
