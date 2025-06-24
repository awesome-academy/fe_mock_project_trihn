import Image from 'next/image';
import type { FC } from 'react';

type AvatarProps = {
  url?: string;
};

const Avatar: FC<AvatarProps> = ({ url }): JSX.Element => {
  return (
    <Image
      className="w-8 h-8 rounded-full"
      src={
        url
          ? `${process.env.NEXT_PUBLIC_API_URL}${url}`
          : '/images/default-avatar.jpg'
      }
      width="32"
      height="32"
      alt="avatar user"
      unoptimized
    />
  );
};

export default Avatar;
