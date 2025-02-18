'use client';

import type { PropsWithChildren } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@/components/icons';
import { useModalStore } from '@/provider/store-provider';

interface Props extends PropsWithChildren {
  title?: string;
  onClose?: () => void;
}

export default function ModalLayout({ title, onClose, children }: Props) {
  const [portal, setPortal] = React.useState<HTMLElement | null>(null);
  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);

  const onCloseModalMergedFunc = () => {
    if (onClose) onClose();

    setNoteLinkModalOpen(false);
  };

  React.useEffect(() => {
    setPortal(document.getElementById('modal-portal'));
  }, []);

  return portal
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
        >
          <dialog open className="w-10/12 max-w-[520px] rounded-xl bg-white p-6">
            <div className="flex justify-between">
              <p className="text-lg font-bold leading-7 text-slate-800">{title}</p>
              <button type="button" name="modal-close-modal" onClick={onCloseModalMergedFunc}>
                <CloseIcon />
              </button>
            </div>
            {children}
          </dialog>
        </div>,
        portal
      )
    : null;
}
