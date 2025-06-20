import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'pagination' | 'add';
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

const sizes: Record<'sm' | 'md', string> = {
  sm: 'px-2 py-1 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-2xl',
};

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700',
  secondary: 'bg-gray-600 hover:bg-gray-700',
  add: 'bg-green-400 hover:bg-green-500',
  pagination:
    'min-w-[42px] btn btn-sm hover:bg-violet-500 !text-gray-500 hover:!text-white !shadow-none',
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  size = 'md',
  className = '',
  icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'text-white font-medium shadow-md transition duration-200 focus:outline-none flex items-center justify-center gap-1',
        { 'opacity-50 cursor-not-allowed': disabled },
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
