export default function TomatoFill() {
  return (
    <div className="relative">
      <div className="relative h-32 w-32 overflow-hidden rounded-full">
        <div className="absolute h-32 w-32 overflow-hidden rounded-full border-[6px] border-main" />
        <div className="absolute bottom-0 left-0 w-full animate-tomatofill bg-main" />
      </div>
    </div>
  );
}
