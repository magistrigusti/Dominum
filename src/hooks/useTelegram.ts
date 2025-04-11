import { useEffect } from 'react';

export function useTelegram() {
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (tg) tg.ready();
  }, [tg]);

  const onClose = () => {
    if (tg) tg.close();
  };

  return {
    tg,
    onClose,
    user: tg?.initDataUnsafe?.user,
  };
}
