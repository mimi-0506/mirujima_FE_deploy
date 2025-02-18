'use client';

import dynamic from 'next/dynamic';

export const ReadOnlyEditor = dynamic(() => import('./ReadOnlyEditor'), { ssr: false });
