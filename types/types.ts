// types/types.ts
declare module '*.svg' {
  import React from 'react';
  export const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module '*.png' {
  export const value: string;
}
