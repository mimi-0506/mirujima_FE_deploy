import type { IconSvgProps } from './iconSvgProps.type';

export const EmbedIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2232_13431)">
        <circle cx="12" cy="12" r="12" fill="#3B82F6" />
        <rect
          x="4.75"
          y="7.75"
          width="14.2143"
          height="9.5"
          rx="0.821429"
          stroke="white"
          strokeWidth="1.5"
        />
        <rect x="6.25" y="9" width="3.5" height="7" rx="0.785714" fill="#93C5FD" />
        <path
          d="M11.0703 14.4644V10.9287M11.0703 10.9287H14.606M11.0703 10.9287L14.9989 14.8573"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2232_13431">
          <rect width={size || width} height={size || height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
