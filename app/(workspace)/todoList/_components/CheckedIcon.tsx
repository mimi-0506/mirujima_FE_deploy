import type { IconSvgProps } from '@/components/icons/iconSvgProps.type';

export const CheckedIcon = ({ width = 12, height = 8 }: IconSvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 3.625L4.10983 6.73483C4.25628 6.88128 4.49372 6.88128 4.64017 6.73483L10.375 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fillRule="evenodd"
      />
    </svg>
  );
};
