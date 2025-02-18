import React from 'react';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto bg-gray100 px-4 pb-[68px] pt-16 mobile:pl-[112px] md:px-6 md:pl-[336px] md:pt-[94px]">
      <div className="w-full max-w-[1248px]">{children}</div>
    </div>
  );
}
