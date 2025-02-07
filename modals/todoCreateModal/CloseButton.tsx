export default function CloseButton({
  handleClose
}: {
  handleClose: (event: React.MouseEvent) => void;
}) {
  return (
    <button onClick={handleClose} className="absolute right-0">
      닫기
    </button>
  );
}
