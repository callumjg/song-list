import React, { createContext, useState, useEffect } from 'react';
import { cache } from 'swr';
import api from '../../apis/server';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading)
      document.querySelector('#load-overlay').classList.add('hidden');
  }, [isLoading]);

  useEffect(() => {
    const csrf = JSON.parse(localStorage.getItem('csrf'));
    if (!csrf) return setLoading(false);
    api
      .get('/users/me')
      .then((res) => {
        const profile = res.data.user;
        setUser(profile);
        setLoading(false);
      })
      .catch((e) => {
        localStorage.removeItem('csrf');
        setLoading(false);
      });
  }, []);

  const login = async (values) => {
    const response = await api.post('/users/login', values);
    const csrf = response?.data?.csrf;
    const user = response?.data?.user;
    if (csrf) localStorage.setItem('csrf', JSON.stringify(csrf));
    setUser(user);
  };
  const logout = async () => {
    await api.get('/users/auth/logout');
    localStorage.removeItem('csrf');
    cache.clear();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
