import type { FC, SVGProps } from 'react';

const England: FC<SVGProps<SVGSVGElement>> = ({
  width = 24,
  height = 18,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7410 3900"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Flag of England"
      {...props}
    >
      <rect width="7410" height="3900" fill="#b22234" />
      <g fill="#fff">
        <path d="M0 300h7410v300H0zM0 900h7410v300H0zM0 1500h7410v300H0zM0 2100h7410v300H0zM0 2700h7410v300H0zM0 3300h7410v300H0z" />
      </g>
      <rect width="2964" height="2100" fill="#3c3b6e" />
      <g fill="#fff">
        {Array.from({ length: 9 }).map((_, row) =>
          Array.from({ length: row % 2 === 0 ? 6 : 5 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 494 + (row % 2 === 0 ? 247 : 494)}
              cy={row * 210 + 105}
              r="90"
            />
          )),
        )}
      </g>
    </svg>
  );
};

export default England;
