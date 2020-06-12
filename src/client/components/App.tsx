import React, { useState, useEffect } from 'react';
import { SWRConfig } from 'swr';
import Router from './Router';
import api from '../../apis/server';
import './App.scss';

const App: React.FC = () => {
  const [isFocusOn, setFocus] = useState(false);

  // Effect to allow focus outline by keyboard but not mouse
  useEffect(() => {
    // Cancel effect if in server env
    if (!document) return null;

    function updateFocus(e) {
      switch (e.type) {
        case 'keydown':
          setFocus(true);
          break;
        case 'mousedown':
          setFocus(false);
          break;
        default:
        // no default
      }
    }
    // return null;
    document.addEventListener('keydown', updateFocus);
    document.addEventListener('mousedown', updateFocus);

    return () => {
      document.removeEventListener('keydown', updateFocus);
      document.removeEventListener('mousedown', updateFocus);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-focus', !isFocusOn);
  }, [isFocusOn]);
  return (
    <SWRConfig
      value={{
        fetcher: (url) => api.get(url).then((r) => r.data),
      }}
    >
      <Router />
    </SWRConfig>
  );
};

export default App;
