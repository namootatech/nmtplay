import { useEffect } from 'react'

const PROPELLER_CODE = '//cdn.propeller-ads.com/tags/8944573/pol.js';

const PropellerAd = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = PROPELLER_CODE;
      
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <div id="propeller-ad-1"></div>
  );
}

export default PropellerAd;
