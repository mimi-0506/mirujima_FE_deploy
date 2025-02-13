import FlagBlackIcon from '@/public/icon/flag-black.svg';

export default function GoalList() {
  return (
    <div className="mt-8">
      <h2 className="h2 mb-6 flex items-center gap-2">
        <FlagBlackIcon />
        목표 별 할 일
      </h2>
      <div className="rounded-container w-full">목표</div>
    </div>
  );
}
