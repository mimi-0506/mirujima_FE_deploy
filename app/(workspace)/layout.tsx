import React from 'react';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto bg-white px-4 pb-[68px] pt-16 md:px-6 md:pl-[112px] md:pt-[64px] desktop:bg-gray100 desktop:pl-[336px] desktop:pt-[94px]">
      <div className="w-full max-w-[1248px]">{children}</div>
    </div>
  );
}
