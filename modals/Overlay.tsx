type OverlayProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDialogElement>;
};

export default function Overlay({ children, onClick }: OverlayProps) {
  return (
    <dialog
      id="modal"
      onClick={onClick}
      className="absolute top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50"
    >
      {children}
    </dialog>
  );
}
