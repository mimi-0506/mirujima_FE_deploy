import type { ModalActionProps } from './modalAction.type';

export type ModalControlProps<TArgs extends unknown[] = []> = Omit<
  ModalActionProps,
  'onConfirm'
> & {
  onConfirm: (...args: TArgs) => void;
};
export type NoteConfirmModalProps = ModalActionProps & {
  type: 'temp' | 'delete';
  contentTitle: string;
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

interface ModalState {
  isIOSPWAGuideModalOpen: boolean;
  isNoteConfirmModalOpen: boolean;
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
  isTodoDeleteConfirmModalOpen: boolean;
  isNoteLinkModalOpen: boolean;
  isGoalDeleteModalOpen: boolean;
  isGoalEditModalOpen: boolean;
  isGoalCreateModalOpen: boolean;
  isLoading: boolean;
}

interface ModalProps {
  noteConfirmModalProps: NoteConfirmModalProps | null;
  todoDeleteConfirmModalProps: DeleteModalProps | null;
  noteLinkModalProps: NoteLinkModalProps | null;
  goalDeleteModalProps: DeleteModalProps | null;
  goalEditModalProps: EditModalProps | null;
}

interface ModalStore extends ModalState, ModalProps {}

interface ModalActions {
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
