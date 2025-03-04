import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { FILE_SIZE_5MB } from '@/constant/numbers';
import { FILE_SIZE_ERROR, URL_ERROR, URL_VALID_ERROR } from '@/constant/toastText';
import { useTodoCreateModalStore } from '@/provider/store-provider';

import AddIcon from '../../public/icon/add-gray.svg';

export default function Uploader() {
  const fileRef = useRef<HTMLInputElement>(null);
  const fileName = useTodoCreateModalStore((state) => state.fileName);
  const linkUrl = useTodoCreateModalStore((state) => state.linkUrl);
  const setCreatedTodoState = useTodoCreateModalStore((state) => state.setCreatedTodoState);

  const [selectedOption, setSelectedOption] = useState<'file' | 'link'>('file');

  useEffect;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      if (selectedFile.size > FILE_SIZE_5MB) {
        toast.error(FILE_SIZE_ERROR);
        return;
      }

      setCreatedTodoState({ fileName: selectedFile.name });
    } else setCreatedTodoState({ fileName: '' });
  };

  const handleLinkPaste = async () => {
    const nowLink = await navigator.clipboard.readText();
    // 있는 url을 지우는 ui도 필요할듯

    try {
      const url = new URL(nowLink);
      if (['http:', 'https:'].includes(url.protocol)) {
        setCreatedTodoState({ linkUrl: nowLink });
      } else toast.error(URL_VALID_ERROR);
    } catch {
      toast.error(URL_ERROR);
    }
  };

  const RadioButton = ({ use, text }: { use: 'file' | 'link'; text: string }) => {
    return (
      <label
        className={`flex h-[50px] w-1/2 cursor-pointer items-center justify-center rounded-lg text-center ${
          selectedOption === use
            ? 'bg-solid text-main'
            : 'border border-gray200 bg-white text-gray350'
        }`}
      >
        <input
          type="radio"
          value={use}
          checked={selectedOption === use}
          onChange={() => setSelectedOption(use)}
          className="hidden"
        />
        {text}
      </label>
    );
  };

  return (
    <div>
      <label>자료</label>

      <div className="mt-4 flex gap-4">
        <RadioButton use="file" text="파일 업로드" />
        <RadioButton use="link" text="링크 첨부" />
      </div>

      <div className="mt-2 flex h-[9vw] w-full items-center justify-center rounded-lg bg-Cgray text-gray350">
        <div className={`${selectedOption !== 'file' && 'hidden'}`}>
          <input
            type="file"
            name="file"
            ref={fileRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {fileName === '' ? (
            <button
              className="flex gap-2"
              type="button"
              onClick={() => {
                if (fileRef.current) fileRef.current.click();
              }}
            >
              <AddIcon /> 파일을 업로드 해주세요
            </button>
          ) : (
            <div
              onClick={() => {
                if (fileRef.current) fileRef.current.click();
              }}
              className="hover:cursor-pointer"
            >
              <p className="mt-2 text-gray-600">{fileName?.split('/').at(-1)}</p>
            </div>
          )}
        </div>

        <div className={`${selectedOption !== 'link' && 'hidden'}`}>
          <input value={linkUrl} name="linkUrl" readOnly className="hidden" />

          <button type="button" onClick={handleLinkPaste}>
            {linkUrl === '' || linkUrl === null ? '링크를 첨부해주세요' : linkUrl}
          </button>
        </div>
      </div>
    </div>
  );
}
