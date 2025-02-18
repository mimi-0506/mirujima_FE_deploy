import React from 'react';

import type { IconSvgProps } from './iconSvgProps.type';

/** 원하는 상위 태그 className에 group/more을 추가하면 상위 태그 focus 시 색상 변경 */
export default function KebabIcon({ size = 24, width, height, ...props }: IconSvgProps) {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill="#575151"
      xmlns="http://www.w3.org/2000/svg"
      className="group-focus/more:text-white"
      {...props}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="6"
        fill="#F6F6F6"
        className="group-focus/more:fill-gray400"
      />
      <path
        d="M11.2736 7.864C11.2736 8.34117 11.6604 8.728 12.1376 8.728C12.6148 8.728 13.0016 8.34117 13.0016 7.864C13.0016 7.38683 12.6148 7 12.1376 7C11.6604 7 11.2736 7.38683 11.2736 7.864Z"
        fill="currentColor"
      />
      <path
        d="M11.2736 11.5925C11.2736 12.0697 11.6604 12.4565 12.1376 12.4565C12.6148 12.4565 13.0016 12.0697 13.0016 11.5925C13.0016 11.1153 12.6148 10.7285 12.1376 10.7285C11.6604 10.7285 11.2736 11.1153 11.2736 11.5925Z"
        fill="currentColor"
      />
      <path
        d="M11.2736 15.3201C11.2736 15.7972 11.6604 16.1841 12.1376 16.1841C12.6148 16.1841 13.0016 15.7972 13.0016 15.3201C13.0016 14.8429 12.6148 14.4561 12.1376 14.4561C11.6604 14.4561 11.2736 14.8429 11.2736 15.3201Z"
        fill="currentColor"
      />
    </svg>
  );
}
