import { useInfoStore } from '../../stores/infoStore';

export default function useAuth() {
  const { id, email, name } = useInfoStore();

  const isLoggedIn = id !== null;

  return {
    isLoggedIn,
    user: { id, email, name }
  };
}
