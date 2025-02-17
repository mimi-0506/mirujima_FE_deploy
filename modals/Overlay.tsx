export default function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <dialog
      id="modal"
      className="absolute top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50"
    >
      {children}
    </dialog>
  );
}
