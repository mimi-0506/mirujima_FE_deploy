import SpinIcon from '@/public/icon/spin.svg';

type Props = {
  size?: number;
  className?: string;
};

export default function LoadingSpinner({ size = 24, className = 'h-full' }: Props) {
  return (
    <div className={`flex-center ${className} box-border`}>
      <SpinIcon width={size} height={size} />
    </div>
  );
}
