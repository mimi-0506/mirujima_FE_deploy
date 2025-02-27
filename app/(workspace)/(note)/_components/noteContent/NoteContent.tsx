'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { createNote, updateNote } from '@/apis/clientActions/note';
import useNoteLink from '@/hooks/note/useNoteLink';
import useTempNote from '@/hooks/note/useTempNote';
import { useEmbedStore } from '@/provider/store-provider';
import SuccessIcon from '@/public/icon/success-red.svg';
import { noteSchema } from '@/schema/noteSchema';

import ButtonArea from './buttonArea/ButtonArea';
import ContentInfo from './contentInfo/ContentInfo';
import { Editor } from './editor/DynamicEditor';
import LinkArea from './linkArea/LinkArea';
import NoteInfo from './noteInfo/NoteInfo';
import TempNote from './tempNote/TempNote';
import TitleInput from './titleInput/TitleInput';

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
    useTempNote(todo.goal.id, todo.id);
  const { linkUrl, handleLinkModal, handleDeleteLink, setLink } = useNoteLink(note?.linkUrl);
  const isEmbedContentOpen = useEmbedStore(({ state }) => state.isEmbedContentOpen);

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
        toast.success('노트 수정 완료!');
      } else {
        const note: CreateNoteType = {
          todoId: todo.id,
          title,
          content,
          linkUrl: linkUrl || ''
        };
        const res = await createNote(note);
        toast.success('노트 생성 완료!');
      }
      // 노트 작성/수정 시 임시 저장 노트 삭제
      deleteTempNote();
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const onSaveTempNote = () => {
    onSaveTempToStorage(getValues('title'), getValues('content'), linkUrl);
    toast('임시 저장이 완료 되었습니다.', {
      duration: 2000,
      position: 'bottom-center',
      style: { color: '#F86969', borderRadius: '20px', border: '1px solid #F86969' },
      icon: <SuccessIcon />
    });
  };

  const onLoadTempNote = () => {
    if (!tempedNote) return;

    setLink(tempedNote.linkUrl);
    setValue('title', tempedNote.noteTitle);
    setValue('content', tempedNote.content);
    setDefaultNoteContent(tempedNote.content);
    resetHasTempNote();
    toast.success('임시 저장 노트 불러오기 성공');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col items-center space-y-6 ${isEmbedContentOpen ? 'w-full desktop:w-[500px]' : 'w-full'}`}
    >
      <ButtonArea isEdit={isEdit} isValid={isValid} onSaveTempNote={onSaveTempNote} />
      {hasTempedNote && (
        <TempNote tempedNote={tempedNote} onRemove={resetHasTempNote} onLoad={onLoadTempNote} />
      )}
      <div className="w-full space-y-6 bg-white desktop:px-6 desktop:pt-[40px]">
        <NoteInfo
          goalTitle={todo.goal.title}
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
  );
}
