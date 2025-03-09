import { useEffect, useState } from 'react';

import { useTodoCreateModalStore } from '@/provider/store-provider';

export default function DoneChecker() {
  const done = useTodoCreateModalStore((state) => state.done);
  const [nowDone, setNowDone] = useState(done);

  // 수정시 초기값 가져오기용용 세팅
  useEffect(() => {
    if (nowDone !== done) setNowDone(done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <div className="absolute left-[105px] top-[-45px] flex gap-[6px]">
      <input
        type="checkbox"
        name="done"
        className="accent-pressed"
        defaultChecked={done}
        onChange={(e) => setNowDone(e.target.checked)}
      />
      Done
    </div>
  );
}
