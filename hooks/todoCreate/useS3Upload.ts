import toast from 'react-hot-toast';

import axios from 'axios';

import { apiWithClientToken } from '@/apis/clientActions';
import { useTodoCreateModalStore } from '@/provider/store-provider';

export default function useS3Upload() {
  const { fileName } = useTodoCreateModalStore((state) => state);

  const fileUpload = async (file: File) => {
    try {
      const { filePath, signedUrl } = await getFileUploadUrl();
      await setFileUpload(signedUrl, file);

      toast('이미지 업로드 완료');
      return filePath;
    } catch (error) {
      toast.error('이미지 업로드 실패');
    }
  };

  const getFileUploadUrl = async () => {
    const { data } = await apiWithClientToken.post(`/files/upload?fileName=${fileName}`);

    return data.result;
  };

  const setFileUpload = async (uploadUrl: string, file: File) => {
    const fileFormData = new FormData();
    fileFormData.append('file', file);

    const { data } = await axios.put(uploadUrl, fileFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return { fileUpload };
}
