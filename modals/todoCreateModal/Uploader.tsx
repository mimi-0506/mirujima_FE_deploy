import { useRef, useState } from 'react';

export default function Uploader() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<'file' | 'link'>('file');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');
  const [link, setLink] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);

      const url = URL.createObjectURL(file);
      setFile(url);
    } else {
      setFileName('');
      setFile('');
    }
  };

  const handleLinkPaste = async () => {
    const nowLink = await navigator.clipboard.readText();
    setLink(nowLink);
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
