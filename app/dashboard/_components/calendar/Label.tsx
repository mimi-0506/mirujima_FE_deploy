export const labelColorMap: Record<string, string> = {
  '100% 달성': 'bg-main',
  '70% 이상 달성': 'bg-default',
  '30% 이상 달성': 'bg-solid'
};

export default function Label({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-1 text-small text-gray400 desktop:text-sm/4">
      <span className={`inline-block h-4 w-4 rounded-full ${labelColorMap[label]}`} />
      {label}
    </li>
  );
}
