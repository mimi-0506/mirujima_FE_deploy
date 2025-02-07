export default function CloseButton({ handleClose }: { handleClose: any }) {
  return (
    <button onClick={handleClose} className="absolute right-0">
      닫기
    </button>
  );
}
