import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function Uploader() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<'file' | 'link'>('file');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');
  const [link, setLink] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (file) URL.revokeObjectURL(file); // 이전에 생성된 URL 해제

    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      // 파일 크기 제한 관련해서는 이후 백엔드와 상의
      // if (selectedFile.size > 5 * 1024 * 1024) {
      //   alert('파일 크기는 5MB를 초과할 수 없습니다.');
      //   return;
      // }

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

    try {
      const url = new URL(nowLink);
      if (['http:', 'https:'].includes(url.protocol)) setLink(nowLink);
      else toast.error('올바른 주소가 아닙니다!');
    } catch {
      toast.error('주소만 입력 가능합니다!');
    }
  };

  const RadioButton = ({ use, text }: { use: 'file' | 'link'; text: string }) => {
    return (
      <label
        className={`cursor-pointer rounded-md p-2 ${
          selectedOption === use ? 'bg-black text-white' : 'bg-white text-black'
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

      <div className="flex gap-4">
        <RadioButton use="file" text="파일 업로드" />
        <RadioButton use="link" text="링크 첨부" />
      </div>

      {selectedOption === 'file' && (
        <>
          <input type="file" ref={fileRef} onChange={handleFileChange} className="hidden" />
          {fileName === '' ? (
            <button
              type="button"
              onClick={() => {
                if (fileRef.current) fileRef.current.click();
              }}
            >
              파일을 업로드해주세요
            </button>
          ) : (
            <div className="mt-4">
              {fileName && <p className="mt-2 text-gray-600">{fileName}</p>}
              <input value={file} name="fileUrl" className="hidden" readOnly />
            </div>
          )}
        </>
      )}

      {selectedOption === 'link' && (
        <>
          {link === '' ? '링크를 첨부해주세요' : <input value={link} name="linkUrl" readOnly />}
          <button type="button" onClick={handleLinkPaste}>
            링크 붙여넣기
          </button>
        </>
      )}
    </div>
  );
}
