import { useEffect, useState } from 'react';
import api from '../lib/axios';
import type { UserT } from '../types';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [userDetail, setUserDetail] = useState<UserT | null>(null);

  function checkCookieDetail() {
    api
      .get<UserT>('/auth/me')
      .then((res) => {
        setIsAuth(true);
        setUserDetail(res.data);
      })
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    checkCookieDetail();
  }, []);

  return { isAuth, loading, userDetail };
};
