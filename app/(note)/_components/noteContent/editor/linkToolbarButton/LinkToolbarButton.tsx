'use client';

import React from 'react';

import { useComponentsContext } from '@blocknote/react';

import { LinkIcon } from '@/components/icons';

interface Props {
  onClick: () => void;
}

export default function LinkToolbarButton({ onClick }: Props) {
  const Components = useComponentsContext()!;

  return (
    <Components.FormattingToolbar.Button mainTooltip={''} onClick={onClick} data-custom-button>
      <LinkIcon size={16} />
    </Components.FormattingToolbar.Button>
  );
}
