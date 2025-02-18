'use client';

import React from 'react';

import { useComponentsContext } from '@blocknote/react';

import { useModalStore } from '@/provider/store-provider';
import EmbedLinkIcon from '@/public/icon/embed-link.svg';

export default function LinkToolbarButton() {
  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);

  const Components = useComponentsContext()!;

  const onClick = () => {
    setNoteLinkModalOpen(true);
  };

  return (
    <Components.FormattingToolbar.Button mainTooltip={''} onClick={onClick} data-custom-button>
      <EmbedLinkIcon />
    </Components.FormattingToolbar.Button>
  );
}
