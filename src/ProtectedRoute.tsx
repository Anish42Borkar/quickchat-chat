import type { ReactNode } from 'react';
import { useAuth } from './hooks/useAuth';
import { useUserDetails } from './store/userDetailStore';

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuth, loading, userDetail } = useAuth();
  const { updateUserDetails } = useUserDetails.getState();

  if (loading) return <div>Loading...</div>;

  if (!isAuth) {
    window.location.href = 'http://quickchat.local';
    return;
  }

  updateUserDetails(userDetail);

  return <>{children}</>;
};
