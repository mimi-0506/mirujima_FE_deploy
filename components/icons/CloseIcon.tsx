import type { IconSvgProps } from './iconSvgProps.type';

export const CloseIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.19238 6.19129C6.50483 5.8789 7.01136 5.87895 7.32375 6.1914L12.0001 10.8687L16.6784 6.19129C16.9908 5.8789 17.4974 5.87895 17.8097 6.1914C18.1221 6.50385 18.1221 7.01038 17.8096 7.32277L13.1319 11.9996L17.8097 16.6773C18.1221 16.9898 18.1221 17.4963 17.8097 17.8087C17.4973 18.1211 16.9907 18.1211 16.6783 17.8087L12.001 13.1314L7.32369 17.8087C7.01127 18.1211 6.50474 18.1211 6.19232 17.8087C5.8799 17.4963 5.8799 16.9898 6.19232 16.6773L10.8692 12.0005L6.19227 7.32266C5.87988 7.01021 5.87993 6.50368 6.19238 6.19129Z"
        fill="#1C1616"
      />
    </svg>
  );
};

export const CloseCircleIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group/circle"
      {...props}
    >
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
        fill="#C0C0C0"
        className="hover-animate group-hover/circle:fill-main"
      />
      <path
        d="M9.02361 7.98652C8.73725 7.70011 8.27293 7.70006 7.98652 7.98642C7.70011 8.27278 7.70006 8.7371 7.98642 9.02351L10.963 12.0006L7.98647 14.9771C7.70008 15.2635 7.70008 15.7278 7.98647 16.0142C8.27285 16.3006 8.73717 16.3006 9.02356 16.0142L12.0003 13.0374L14.9771 16.0142C15.2635 16.3006 15.7278 16.3006 16.0142 16.0142C16.3006 15.7278 16.3006 15.2635 16.0142 14.9771L13.0372 12.0001L16.0142 9.02361C16.3006 8.73725 16.3006 8.27293 16.0143 7.98652C15.7279 7.70011 15.2636 7.70006 14.9772 7.98642L11.9998 10.9633L9.02361 7.98652Z"
        fill="white"
        stroke="white"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
