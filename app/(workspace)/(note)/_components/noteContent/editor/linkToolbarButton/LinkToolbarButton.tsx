'use client';

import React from 'react';

import { useComponentsContext } from '@blocknote/react';

import EmbedLinkIcon from '@/public/icon/embed-link.svg';

interface Props {
  handleLinkModal: (() => void) | undefined;
}

export default function LinkToolbarButton({ handleLinkModal }: Props) {
  const Components = useComponentsContext()!;

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={''}
      onClick={handleLinkModal}
      data-custom-button
    >
      <EmbedLinkIcon width="20" height="20" />
    </Components.FormattingToolbar.Button>
  );
}
