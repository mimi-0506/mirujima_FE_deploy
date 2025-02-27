import TomatoFill from '@/components/loading/TomatoFill';

import Overlay from '../Overlay';

export default function Loading() {
  return (
    <Overlay>
      <div className="text-[5vw] text-white">
        <TomatoFill />
      </div>
    </Overlay>
  );
}
