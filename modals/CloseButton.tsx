import X from '../public/icon/X.svg';

export default function CloseButton({
  handleClose
}: {
  handleClose: (event: React.MouseEvent) => void;
}) {
  return (
    <button className="flex h-6 w-6 items-center justify-center" onClick={handleClose}>
      <X width="24" height="24" />
    </button>
  );
}
