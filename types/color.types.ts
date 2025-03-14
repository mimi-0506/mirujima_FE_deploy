export type LabelType = '100% 달성' | '70% 이상 달성' | '30% 이상 달성';
export type BgVariant = 'main' | 'default' | 'solid';

export type Priority = 1 | 2 | 3 | 4;
export type BorderVariant = 'default' | 'lightLabel1' | 'lightLabel4' | 'lightGray400';
export type TextVariant = 'main' | 'label1' | 'label4' | 'gray400';

export type PriorityOption = {
  value: Priority | 'all';
  text: string;
};
