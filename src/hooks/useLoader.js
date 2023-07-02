import { useCallback, useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showLoader = useCallback(() => {
    setIsLoading(true);
  }, []);
  const hideLoader = useCallback(() => setIsLoading(false), []);
  return { isLoading, showLoader, hideLoader };
};
export default useLoader;