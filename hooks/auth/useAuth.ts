import { useRouter } from 'next/navigation';

import { useInfoStore } from '@/provider/store-provider';

export default function useAuth() {
  const router = useRouter();
  const { id, email, name, logout } = useInfoStore((state) => state);

  const isLoggedIn = id !== null;

  return {
    isLoggedIn,
    user: { id, email, name }
  };
}
