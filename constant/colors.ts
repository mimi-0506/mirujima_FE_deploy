import { BgVariant, BorderVariant, LabelType, Priority, TextVariant } from '@/types/color.types';

export const primaryColors: Record<Priority, `border-${BorderVariant} text-${TextVariant}`> = {
  1: 'border-default text-main',
  2: 'border-lightLabel1 text-label1',
  3: 'border-lightLabel4 text-label4',
  4: 'border-lightGray400 text-gray400'
};

export const labelColors: Record<LabelType, `bg-${BgVariant}`> = {
  '100% 달성': 'bg-main',
  '70% 이상 달성': 'bg-default',
  '30% 이상 달성': 'bg-solid'
};
