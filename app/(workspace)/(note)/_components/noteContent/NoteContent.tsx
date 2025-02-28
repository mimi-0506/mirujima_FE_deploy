'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { createNote, updateNote } from '@/apis/clientActions/note';
import {
  NOTE_CREATE_ERROR,
  NOTE_CREATE_SUCCESS,
  NOTE_EDIT_SUCCESS,
  TEMP_GET_SUCCESS,
  TEMP_SAVE_SUCCESS
} from '@/constant/toastText';
import useNoteLink from '@/hooks/note/useNoteLink';
import useTempNote from '@/hooks/note/useTempNote';
import SuccessIcon from '@/public/icon/success-red.svg';
import { noteSchema } from '@/schema/noteSchema';

import ButtonArea from './buttonArea/ButtonArea';
import ContentInfo from './contentInfo/ContentInfo';
import { Editor } from './editor/DynamicEditor';
import LinkArea from './linkArea/LinkArea';
import NoteInfo from './noteInfo/NoteInfo';
import TempNote from './tempNote/TempNote';
import TitleInput from './titleInput/TitleInput';
import ContentLayout from '../layout/ContentLayout';

import type { NoteInputData } from '@/schema/noteSchema';
import type { CreateNoteType, NoteType, UpdateNoteType } from '@/types/note.type';
import type { TodoType } from '@/types/todo.type';

interface Props {
  todo: TodoType;
  note: NoteType | null;
}

export default function NoteContent({ todo, note }: Props) {
  const [isEdit] = React.useState(!!note);
  const [defaultNoteContent, setDefaultNoteContent] = React.useState(note?.content);
  const router = useRouter();

  const { onSaveTempToStorage, deleteTempNote, hasTempedNote, resetHasTempNote, tempedNote } =
    useTempNote(todo?.goal?.id, todo.id);
  const { linkUrl, handleLinkModal, handleDeleteLink, setLink } = useNoteLink(note?.linkUrl);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { isValid }
  } = useForm<NoteInputData>({
    resolver: zodResolver(noteSchema),
    mode: 'onChange',
    defaultValues: {
      title: note?.title,
      content: note?.content
    }
  });

  const onSubmit: SubmitHandler<NoteInputData> = async (data) => {
    const { title, content } = data;

    try {
      if (isEdit && note) {
        const newNote: UpdateNoteType = {
          title,
          content,
          linkUrl: linkUrl || ''
        };
        const res = await updateNote(note.id, newNote);
        toast.success(NOTE_EDIT_SUCCESS);
      } else {
        const note: CreateNoteType = {
          todoId: todo.id,
          title,
          content,
          linkUrl: linkUrl || ''
        };
        const res = await createNote(note);
        toast.success(NOTE_CREATE_SUCCESS);
      }
      // 노트 작성/수정 시 임시 저장 노트 삭제
      deleteTempNote();
      router.push('/noteList');
    } catch (error) {
      console.error(error);
      toast.error(NOTE_CREATE_ERROR);
    }
  };

  const onSaveTempNote = () => {
    onSaveTempToStorage(getValues('title').trim(), getValues('content'), linkUrl);
    toast.success(TEMP_SAVE_SUCCESS, {
      duration: 2000,
      position: 'bottom-center',
      style: { color: '#F86969', borderRadius: '20px', border: '1px solid #F86969' },
      icon: <SuccessIcon />
    });
    //따로 빼려고 했는데, 생각해보니 여기 외에는 해당 토스트를 쓰는 곳이 없어서 그냥 놔두는 쪽이 좋을 것 같아요🤔
  };

  const onLoadTempNote = () => {
    if (!tempedNote) return;

    setLink(tempedNote.linkUrl);
    setValue('title', tempedNote.noteTitle, {
      shouldValidate: true
    });
    setValue('content', tempedNote.content);
    setDefaultNoteContent(tempedNote.content);
    resetHasTempNote();
    toast.success(TEMP_GET_SUCCESS);
  };

  return (
    <ContentLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center space-y-6"
      >
        <ButtonArea isEdit={isEdit} isValid={isValid} onSaveTempNote={onSaveTempNote} />
        {hasTempedNote && (
          <TempNote tempedNote={tempedNote} onRemove={resetHasTempNote} onLoad={onLoadTempNote} />
        )}
        <div className="w-full space-y-6 bg-white desktop:px-6 desktop:pt-[40px]">
          <NoteInfo
            goalTitle={todo?.goal?.title}
            todoTitle={todo.title}
            noteUpdatedAt={note?.updatedAt}
          />
          <div className="space-y-[40px]">
            <TitleInput register={register} control={control} />
            <div className="space-y-4 px-4">
              <ContentInfo control={control} />

              {linkUrl && <LinkArea linkUrl={linkUrl} onDeleteLink={handleDeleteLink} />}
              <div className="min-h-[400px]">
                <Editor
                  register={register}
                  setValue={setValue}
                  defaultContent={defaultNoteContent}
                  handleLinkModal={handleLinkModal}
                  isEditable={true}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </ContentLayout>
  );
}
