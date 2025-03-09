import { useInfoStore } from '@/provider/store-provider';

export default function useAuth() {
  const userId = useInfoStore((state) => state.userId);
  const email = useInfoStore((state) => state.email);
  const name = useInfoStore((state) => state.name);

  const isLoggedIn = userId !== null;

  return {
    isLoggedIn,
    user: { userId, email, name }
  };
}
