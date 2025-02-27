'use client';

import type { PropsWithChildren } from 'react';
import React from 'react';

import { useEmbedStore } from '@/provider/store-provider';

export default function ContentLayout({ children }: PropsWithChildren) {
  const isEmbedContentOpen = useEmbedStore(({ state }) => state.isEmbedContentOpen);

  return (
    <div
      data-embed-open={isEmbedContentOpen}
      className="w-full desktop:transition-all desktop:duration-100 desktop:ease-linear desktop:data-[embed-open=true]:w-[500px]"
    >
      {children}
    </div>
  );
}
