import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { FILE_SIZE_5MB } from '@/constant/numbers';
import { useModalStore } from '@/provider/store-provider';

import AddIcon from '../../public/icon/add-gray.svg';

export default function Uploader() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { todoCreateModal, setTodoCreateModal } = useModalStore((state) => state);

  const [selectedOption, setSelectedOption] = useState<'file' | 'link'>('file');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (todoCreateModal.filePath) {
      setFile(todoCreateModal.filePath);
      setFileName(todoCreateModal.filePath.split('/').pop() || '');
    }

    if (todoCreateModal.linkUrl !== '') setLink(todoCreateModal.linkUrl);
  }, [todoCreateModal]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (file) URL.revokeObjectURL(file); // 이전에 생성된 URL 해제

    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      if (selectedFile.size > FILE_SIZE_5MB) {
        toast('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }

      setFileName(selectedFile.name);

      const url = URL.createObjectURL(selectedFile);
      setFile(url);
    } else {
      setFileName('');
      setFile('');
    }
  };

  const handleLinkPaste = async () => {
    const nowLink = await navigator.clipboard.readText();
    //있는 url을 지우는 ui도 필요할듯

    try {
      const url = new URL(nowLink);
      if (['http:', 'https:'].includes(url.protocol)) {
        setLink(nowLink);
      } else toast.error('올바른 주소가 아닙니다!');
    } catch {
      toast.error('주소만 입력 가능합니다!');
    }
  };

  const RadioButton = ({ use, text }: { use: 'file' | 'link'; text: string }) => {
    return (
      <label
        className={`flex h-[50px] w-[232px] cursor-pointer items-center justify-center rounded-lg text-center ${
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

      <div className="mt-2 flex h-[180px] w-full items-center justify-center rounded-lg bg-Cgray text-gray350">
        {selectedOption === 'file' && (
          <>
            <input type="file" ref={fileRef} onChange={handleFileChange} className="hidden" />
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
                {fileName && <p className="mt-2 text-gray-600">{fileName}</p>}
                <input value={file} name="fileUrl" className="hidden" readOnly />
              </div>
            )}
          </>
        )}

        {selectedOption === 'link' && (
          <>
            <input value={link} name="linkUrl" readOnly className="hidden" />

            <button type="button" onClick={handleLinkPaste}>
              {link === '' ? '링크를 첨부해주세요' : link}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
