import { useRef, useState } from 'react';

export default function Uploader() {
  const fileRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState<'file' | 'line'>('file');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
    else setFileName('');
  };

  return (
    <div>
      <label>자료</label>

      <div className="flex gap-4">
        <label
          className={`cursor-pointer rounded-md p-2 ${
            selectedOption === 'file' ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          <input
            type="radio"
            name="uploadOption"
            value="file"
            checked={selectedOption === 'file'}
            onChange={() => setSelectedOption('file')}
            className="hidden"
          />
          파일 업로드
        </label>

        <label
          className={`cursor-pointer rounded-md p-2 ${
            selectedOption === 'link' ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          <input
            type="radio"
            name="uploadOption"
            value="link"
            checked={selectedOption === 'link'}
            onChange={() => setSelectedOption('link')}
            className="hidden"
          />
          링크 첨부
        </label>
      </div>

      {selectedOption === 'file' && (
        <div className="mt-4">
          <input type="file" ref={fileRef} onChange={handleFileChange} />
          {fileName && <p className="mt-2 text-gray-600">선택한 파일: {fileName}</p>}
        </div>
      )}

      <div className="mt-4 text-gray-700">
        {selectedOption === 'file' ? '파일을 업로드해주세요' : '링크를 첨부해주세요'}
      </div>
    </div>
  );
}
