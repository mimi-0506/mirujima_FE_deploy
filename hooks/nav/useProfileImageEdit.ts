import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';

export default function useProfileImageEdit() {
  const putProfileImage = async ({
    orgFileName,
    profileImagePath
  }: {
    orgFileName: string;
    profileImagePath: string;
  }) => {
    const response = await apiWithClientToken.put('/user/image', {
      orgFileName: orgFileName,
      profileImagePath: profileImagePath
    });

    return response.data;
  };

  const { mutateAsync } = useMutation({
    mutationFn: putProfileImage,
    onSuccess: () => {
      console.log('onsuccess');
      toast('등록되었습니다.');
    },
    onError: (error) => {
      toast.error('변경에 실패하였습니다.');
      console.error('Error:', error);
    }
  });

  return { mutateAsync };
}
