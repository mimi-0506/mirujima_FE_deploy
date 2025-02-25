import { useRouter } from 'next/navigation';

import { useInfoStore } from '@/provider/store-provider';

export default function useAuth() {
  const router = useRouter();
  const { userId, email, name, logout } = useInfoStore((state) => state);

  const isLoggedIn = userId !== null;

  return {
    isLoggedIn,
    user: { userId, email, name }
  };
}
