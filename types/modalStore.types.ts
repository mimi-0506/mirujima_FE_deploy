export type ModalControlProps<TArgs extends unknown[] = []> = {
  onConfirm: (...args: TArgs) => void;
  onCancel: () => void;
};

/**
 * 노트 관련 모달 타입
 */
export type NoteConfirmModalProps = {
  type: 'temp' | 'delete';
  contentTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export type NoteLinkModalProps = {
  defaultValue: string | undefined;
  onSubmit: () => void;
  linkInputRef: React.RefObject<HTMLInputElement | null>;
};

export type EditModalProps = ModalControlProps<[string]> & {
  initialValue: string;
};

export type DeleteModalProps = ModalControlProps;

/**
 * 전체 모달 스토어 타입
 */
export interface ModalStore {
  isIOSPWAGuideModalOpen: boolean;
  isNoteConfirmModalOpen: boolean;
  noteConfirmModalProps: NoteConfirmModalProps | null;
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
  isTodoDeleteConfirmModalOpen: boolean;
  todoDeleteConfirmModalProps: DeleteModalProps | null;
  isNoteLinkModalOpen: boolean;
  noteLinkModalProps: NoteLinkModalProps | null;
  isGoalDeleteModalOpen: boolean;
  goalDeleteModalProps: DeleteModalProps | null;
  isGoalEditModalOpen: boolean;
  goalEditModalProps: EditModalProps | null;
  isGoalCreateModalOpen: boolean;
  isLoading: boolean;
}

export interface ModalActions {
  setIOSPWAGuideModalOpen: (isOpen: boolean) => void;
  setIsNoteConfirmModalOpen: (isOpen: boolean, props?: NoteConfirmModalProps) => void;
  setIsTodoCreateModalOpen: (isOpen: boolean) => void;
  setIsTodoCreateCheckModalOpen: (isOpen: boolean) => void;
  setIsTodoDeleteConfirmModalOpen: (isOpen: boolean, props?: DeleteModalProps) => void;
  setNoteLinkModalOpen: (isOpen: boolean, props?: NoteLinkModalProps) => void;
  setGoalDeleteModalOpen: (isOpen: boolean, props?: DeleteModalProps) => void;
  setGoalEditModalOpen: (isOpen: boolean, props?: EditModalProps) => void;
  setIsGoalCreateModalOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export type ModalStoreType = ModalStore & ModalActions;
