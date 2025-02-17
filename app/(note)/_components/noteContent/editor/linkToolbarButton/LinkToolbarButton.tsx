'use client';

import React from 'react';

import { useComponentsContext } from '@blocknote/react';

import { LinkIcon } from '@/components/icons';
import { useModalStore } from '@/provider/store-provider';

export default function LinkToolbarButton() {
  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);

  const Components = useComponentsContext()!;

  const onClick = () => {
    setNoteLinkModalOpen(true);
  };

  return (
    <Components.FormattingToolbar.Button mainTooltip={''} onClick={onClick} data-custom-button>
      <LinkIcon size={16} />
    </Components.FormattingToolbar.Button>
  );
}
