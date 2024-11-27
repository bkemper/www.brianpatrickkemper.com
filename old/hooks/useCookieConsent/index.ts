import React from 'react';
import Cookies from 'js-cookie';

type ConsentStatus = 'yes' | 'no' | 'maybe';
type ConsentType = {
  consent: () => void;
  hasConsent: ConsentStatus;
};

const useCookieConsent = (name: string): ConsentType => {
  const [hasConsent, setConsent] = React.useState<ConsentStatus>('maybe');
  const consent = React.useCallback(() => {
    Cookies.set(name, {
      consentedAt: new Date().toISOString(),
    });
    setConsent('yes');
  }, [name, setConsent]);

  // see, https://nextjs.org/docs/messages/react-hydration-error
  React.useEffect(() => {
    setConsent(Cookies.get(name) ? 'yes' : 'no');
  }, [name]);

  return {
    consent,
    hasConsent,
  };
};

export default useCookieConsent;
