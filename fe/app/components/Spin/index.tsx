import type { FC } from 'react';

const Spin: FC = (): JSX.Element => {
  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <div className="loading loading-spinner loading-lg text-primary-800" />
    </div>
  );
};

export default Spin;
