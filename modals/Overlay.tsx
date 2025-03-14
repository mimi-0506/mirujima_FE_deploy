import { useEffect } from 'react';

type OverlayProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDialogElement>;
};

export default function Overlay({ children, onClick }: OverlayProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.scrollBehavior = 'auto';

    return () => {
      document.body.style.overflow = '';
      document.body.style.scrollBehavior = '';
    };
  }, []);

  return (
    <dialog
      id="modal"
      onClick={onClick}
      className="absolute top-0 z-50 flex h-full w-full animate-fadeIn items-center justify-center bg-gray-800 bg-opacity-50"
    >
      {children}
    </dialog>
  );
}
