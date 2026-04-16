import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useNavigateBack(fallbackPath: string = '/') {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = useCallback(() => {
    if (window.history.length > 1 && document.referrer) {
      const referrer = new URL(document.referrer);
      if (referrer.origin === window.location.origin) {
        navigate(-1);
        return;
      }
    }
    navigate(fallbackPath);
  }, [navigate, fallbackPath]);

  return { goBack };
}
