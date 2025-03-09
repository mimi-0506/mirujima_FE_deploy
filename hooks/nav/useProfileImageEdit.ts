import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { IMAGE_CHAGE_ERROR, IMAGE_CHAGE_SUCCESS } from '@/constant/toastText';

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
      toast.success(IMAGE_CHAGE_SUCCESS);
    },
    onError: (error) => {
      toast.error(IMAGE_CHAGE_ERROR);
      console.error('Error:', error);
    }
  });

  return { mutateAsync };
}
