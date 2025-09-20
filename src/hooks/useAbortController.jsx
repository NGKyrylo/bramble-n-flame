import { useEffect, useRef } from 'react';

export const useAbortController = () => {
  const controllerRef = useRef(null);

  useEffect(() => {
    controllerRef.current = new AbortController();
    
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return controllerRef.current?.signal;
};