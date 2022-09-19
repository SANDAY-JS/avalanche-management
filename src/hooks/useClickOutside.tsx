import {useEffect} from 'preact/hooks';

const useClickOutside = (ref: any, callback: Function) => {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback({event: e, message: 'clicked outside'});
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};

export {useClickOutside};
