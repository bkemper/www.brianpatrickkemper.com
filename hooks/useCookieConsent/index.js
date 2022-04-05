import React from 'react';
import Cookies from 'js-cookie';

const useCookieConsent = (name) => {
  const [hasConsent, setConsent] = React.useState(
    Boolean(typeof window !== 'undefined' ? undefined : Cookies.get(name))
  );
  const consent = React.useCallback(() => {
    Cookies.set(name, {
      consentedAt: new Date().toISOString(),
    });
    setConsent(true);
  }, [name]);

  return {
    consent,
    hasConsent,
  };
};

export default useCookieConsent;
