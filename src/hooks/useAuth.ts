import { useEffect, useState } from 'react';
import api from '../lib/axios';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  function checkCookieDetail() {
    api
      .get('/auth/me')
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    checkCookieDetail();
  }, []);

  return { isAuth, loading };
};
