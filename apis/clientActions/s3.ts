import toast from 'react-hot-toast';

import axios from 'axios';

import { IMAGE_DOWNLOAD_ERROR, IMAGE_UPLOAD_ERROR } from '@/constant/toastText';

import { apiWithClientToken } from '.';

export const fileDownload = async (fileName: string) => {
  try {
    const { signedUrl } = await getFileDownloadUrl(fileName);
    return signedUrl; //next/image에 넣을 주소 리턴
  } catch (error) {
    toast.error(IMAGE_DOWNLOAD_ERROR);
  }
};

const getFileDownloadUrl = async (fileName: string) => {
  const encodedFileName = encodeURIComponent(fileName);
  const { data } = await apiWithClientToken.post(`/files/download?fileName=${encodedFileName}`);

  return data.result;
};

//----------------------------------------------------------------

export const fileUpload = async (file: File, fileName: string) => {
  try {
    const { filePath, signedUrl } = await getFileUploadUrl(fileName); //s3주소 얻음
    await setFileUpload(signedUrl, file); //s3주소에 파일 업로드

    return filePath; //해당 경로 리턴
  } catch (error) {
    toast.error(IMAGE_UPLOAD_ERROR);
  }
};

const getFileUploadUrl = async (fileName: string) => {
  const { data } = await apiWithClientToken.post(`/files/upload?fileName=${fileName}`);

  return data.result;
};
const setFileUpload = async (uploadUrl: string, file: File) => {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type || 'application/octet-stream' // 파일 타입을 자동 감지
    }
  });
};
