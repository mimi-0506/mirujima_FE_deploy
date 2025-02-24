import TomatoFill from '@/components/loading/TomatoFill';
import TomatoGradation from '@/components/loading/TomatoGradation';

import Overlay from '../Overlay';

export default function Loading() {
  return (
    <Overlay>
      <div className="text-[5vw] text-white">
        <TomatoFill /> <TomatoGradation />
      </div>
    </Overlay>
  );
}
