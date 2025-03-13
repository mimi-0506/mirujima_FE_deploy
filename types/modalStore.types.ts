import type { NoteConfirmModalProps, NoteLinkModalProps } from '@/types/note.type';
import type { NoteType } from '@/types/note.type';
import { GoalSummary } from './goal.type';

export type BaseCreateModalType = Pick<
  NoteType,
  'title' | 'linkUrl' | 'userId' | 'createdAt' | 'updatedAt'
> & {
  done: boolean;
  filePath: string;
};

export type CreateModalType = BaseCreateModalType & {
  goal: GoalSummary;
  priority: number;
  id?: number;
  noteId?: number;
};

export type ModalControlProps<TArgs extends unknown[] = []> = {
  onConfirm: (...args: TArgs) => void;
  onCancel: () => void;
};

export type EditModalProps = ModalControlProps<[string]> & {
  initialValue: string;
};

export type DeleteModalProps = ModalControlProps;

export type ModalType =
  | 'NoteDetailPage'
  | 'NoteConfirm'
  | 'TodoCreate'
  | 'TodoCreateCheck'
  | 'NoteLink'
  | 'GoalDelete'
  | 'GoalEdit'
  | 'GoalCreate';

export type ModalPropsMap = {
  NoteConfirm: NoteConfirmModalProps;
  TodoCreate: never;
  TodoCreateCheck: never;
  NoteLink: NoteLinkModalProps;
  GoalDelete: DeleteModalProps;
  GoalEdit: EditModalProps;
  GoalCreate: never;
};

export type ModalState = {
  isIOSPWAGuideModalOpen: boolean;
  isNoteConfirmModalOpen: boolean;
  noteConfirmModalProps: NoteConfirmModalProps | null;
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
  isNoteLinkModalOpen: boolean;
  noteLinkModalProps: NoteLinkModalProps | null;
  isGoalDeleteModalOpen: boolean;
  goalDeleteModalProps: DeleteModalProps | null;
  isGoalEditModalOpen: boolean;
  goalEditModalProps: EditModalProps | null;
  isGoalCreateModalOpen: boolean;
  isLoading: boolean;
};

export type ModalActions = {
  setIOSPWAGuideModalOpen: (isOpen: boolean) => void;
  setIsNoteConfirmModalOpen: (isOpen: boolean, props?: NoteConfirmModalProps) => void;
  setIsTodoCreateModalOpen: (isOpen: boolean) => void;
  setIsTodoCreateCheckModalOpen: (isOpen: boolean) => void;
  setNoteLinkModalOpen: (isOpen: boolean, props?: NoteLinkModalProps) => void;
  setGoalDeleteModalOpen: (isOpen: boolean, props?: DeleteModalProps) => void;
  setGoalEditModalOpen: (isOpen: boolean, props?: EditModalProps) => void;
  setIsGoalCreateModalOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export type ModalStore = ModalState & ModalActions;
