import { labelColors } from '@/constant/colors';
import { LabelType } from '@/types/color.type';

export default function Label({ label }: { label: LabelType }) {
  return (
    <li className="flex items-center gap-1 text-small text-gray400 desktop:text-sm/4">
      <span className={`inline-block h-4 w-4 rounded-full ${labelColors[label]}`} />
      {label}
    </li>
  );
}
