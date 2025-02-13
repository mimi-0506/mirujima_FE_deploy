import { useEffect, useState } from 'react';

import { useModalStore } from '@/provider/store-provider';

export default function DoneChecker() {
  const { todoCreateModal } = useModalStore((state) => state);
  const [done, setDone] = useState(todoCreateModal.done);

  useEffect(() => {
    if (todoCreateModal.done !== done) setDone(todoCreateModal.done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoCreateModal.done]);

  return (
    <div className="absolute right-0 mb-3 mt-[-10px] gap-[6px]">
      <input
        type="checkbox"
        name="done"
        className="accent-pressed"
        checked={done}
        onChange={(e) => setDone(e.target.checked)}
      />
      Done
    </div>
  );
}
