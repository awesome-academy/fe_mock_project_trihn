import type { FC, SVGProps } from 'react';

const Vietnam: FC<SVGProps<SVGSVGElement>> = ({
  width = 24,
  height = 18,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 640 480"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="640" height="480" fill="#da251d" />
      <path
        d="M320 144l27 84h88l-71 52 27 84-71-52-71 52 27-84-71-52h88z"
        fill="#ff0"
      />
    </svg>
  );
};

export default Vietnam;
