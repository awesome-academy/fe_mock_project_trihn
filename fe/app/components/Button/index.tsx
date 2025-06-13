import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

const variants: Record<'primary' | 'secondary', string> = {
  primary: 'bg-blue-600 hover:bg-blue-700',
  secondary: 'bg-gray-600 hover:bg-gray-700',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'px-4 py-2 rounded-2xl text-white font-medium shadow-md transition duration-200 focus:outline-none',
        { 'opacity-50 cursor-not-allowed': disabled },
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </button>
  );
};
