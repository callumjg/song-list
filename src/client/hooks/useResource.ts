import { useEffect, useState, useCallback } from 'react';
import server from '../../apis/server';

interface Options {
  onChange?: (args: any) => void;
}

export default function useResource(
  url: string,
  defaultData: any = {},
  options: Options = {}
) {
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nonce, setNonce] = useState(0);
  const onChange = useCallback(options.onChange, []);
  const refresh = () => setNonce(nonce + 1);

  useEffect(() => {
    if (!url) return;
    (async () => {
      setIsLoading(true);
      try {
        const response = await server.get(url);
        setData(response.data);
        if (onChange) onChange(response.data);
      } catch (e) {
        console.error(e);
        let message = e.response ? e.response.data.message : e.message;
        setError(message);
      }
      setIsLoading(false);
    })();
  }, [url, nonce, onChange]);

  return {
    data: url ? data : defaultData,
    error: error as string,
    isLoading: isLoading as boolean,
    refresh,
  };
}
