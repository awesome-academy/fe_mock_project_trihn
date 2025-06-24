import classNames from 'classnames';
import type { FC } from 'react';

type SwitchProps = {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent) => void;
};

const Switch: FC<SwitchProps> = ({
  checked,
  disabled,
  className,
  onChange,
}): JSX.Element => {
  return (
    <input
      type="checkbox"
      className={classNames('toggle toggle-sm toggle-success', className)}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Switch;
