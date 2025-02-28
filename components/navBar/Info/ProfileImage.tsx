import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import Image from 'next/image';

import { fileDownload, fileUpload } from '@/apis/clientActions/s3';
import { FILE_SIZE_5MB } from '@/constant/numbers';
import { FILE_SIZE_ERROR, FILE_UPLOAD_ERROR } from '@/constant/toastText';
import useProfileImageEdit from '@/hooks/nav/useProfileImageEdit';
import { useInfoStore } from '@/provider/store-provider';
import LoadingIcon from '@/public/icon/spin.svg';

import PhotoAddIcon from '../../../public/icon/photo-add.svg';

export default function ProfileImage() {
  const profileImage = useInfoStore((state) => state.profileImage);
  const setInfo = useInfoStore((state) => state.setInfo);

  const { mutateAsync } = useProfileImageEdit();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileImage) getProfileImage(profileImage);
  }, [profileImage]);

  const getProfileImage = async (profileImage: string) => {
    setIsLoading(true);
    const signedUrl = await fileDownload(profileImage);

    const response = await fetch(signedUrl);

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // 기존 Blob URL 정리 (메모리 누수 방지)
    setImageUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return url;
    });
    setIsLoading(false);
  };

  const handleProfileChange = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      if (selectedFile.size > FILE_SIZE_5MB) {
        toast.error(FILE_SIZE_ERROR);
        return;
      }

      setIsLoading(true);

      try {
        const profileImagePath = await fileUpload(selectedFile, selectedFile.name); //1.이미지 업로드
        await mutateAsync({ orgFileName: selectedFile.name, profileImagePath }); // 2.기존 정보 수정

        setInfo({ profileImage: profileImagePath });
        getProfileImage(profileImagePath);
      } catch (error) {
        toast.error(FILE_UPLOAD_ERROR);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative flex aspect-[1/1] w-[64px] items-center justify-center overflow-hidden rounded-lg">
      {isLoading && <LoadingIcon className="absolute z-10 h-full w-full" />}
      <input
        ref={fileRef}
        onChange={handleFileChange}
        type="file"
        accept="image/*"
        className="hidden"
      />

      <Image
        src={imageUrl || '/images/logo/mirujima-logo-tomato.png'}
        width={imageUrl ? 64 : 32}
        height={imageUrl ? 64 : 32}
        alt="profile image"
        priority={true}
      />
      <div
        onClick={handleProfileChange}
        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-200 hover:opacity-100"
      >
        <PhotoAddIcon />
      </div>
    </div>
  );
}
