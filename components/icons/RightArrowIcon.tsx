import type { IconSvgProps } from './iconSvgProps.type';

export const RightArrowIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.75 13.5L11.25 9L6.75 4.5"
        stroke="#F86969"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
