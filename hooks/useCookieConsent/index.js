import React from 'react';
import Cookies from 'js-cookie';
import isSSR from '../../utils/isSSR';

const useCookieConsent = (name) => {
  const [hasConsent, setConsent] = React.useState(() => {
    if (isSSR()) {
      return false;
    }

    return Boolean(Cookies.get(name));
  });
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
