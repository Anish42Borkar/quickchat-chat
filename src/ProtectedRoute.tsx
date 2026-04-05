import type { ReactNode } from 'react';
import { useAuth } from './hooks/useAuth';

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuth, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuth) {
    window.location.href = 'http://quickchat.local';
  }

  return <>{children}</>;
};
