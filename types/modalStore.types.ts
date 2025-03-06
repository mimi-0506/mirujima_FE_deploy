import type { NoteDetailPageModalProps } from '@/app/(workspace)/goals/_components/NoteDetailModal';
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
export type ModalControlProps = {
  onConfirm: (...args: any[]) => void;
  onCancel: () => void;
};

export type EditModalProps = ModalControlProps & {
  initialValue: string;
};

export type DeleteModalProps = ModalControlProps;
// 모달 타입 정의
export type ModalType =
  | 'NoteDetailPage'
  | 'NoteConfirm'
  | 'TodoCreate'
  | 'TodoCreateCheck'
  | 'NoteLink'
  | 'GoalDelete'
  | 'GoalEdit'
  | 'GoalCreate';

// 각 모달 타입에 대응하는 props 매핑
export type ModalPropsMap = {
  NoteDetailPage: NoteDetailPageModalProps;
  NoteConfirm: NoteConfirmModalProps;
  TodoCreate: never; // props 없음
  TodoCreateCheck: never; // props 없음
  NoteLink: NoteLinkModalProps;
  GoalDelete: DeleteModalProps;
  GoalEdit: EditModalProps;
  GoalCreate: never; // props 없음
};

// 모달 상태
export type ModalState = {
  openModals: Partial<Record<ModalType, boolean>>;
  modalProps: Partial<ModalPropsMap>;
  isLoading: boolean;
};

// 모달 액션
export type ModalActions = {
  setModalOpen: <T extends ModalType>(type: T, isOpen: boolean, props?: ModalPropsMap[T]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

// 최종 ModalStore
export type ModalStore = ModalState & ModalActions;
