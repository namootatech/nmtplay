import { useEffect, useRef } from 'react';
export default function Banner() {
  const banner = useRef();

  const atOptions = {
    key: '9f105d6b2d305f896c569bc8d231d4df',
    format: 'iframe',
    height: 300,
    width: 160,
    params: {},
  };
  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement('script');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [banner]);

  return (
    <div
      className='mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center'
      ref={banner}
    ></div>
  );
}
