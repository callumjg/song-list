import React, { createContext, useState, useEffect } from 'react';
import api from '../../apis/server';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // TODO: useeffect to set initial state
  // TODO: Login functions

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
        console.log(e);
        setLoading(false);
      });
  }, []);

  const login = async (values) => {
    console.log(values);
    const { data: user, csrf } = await api.post('/users/login', values);
    localStorage.setItem('csrf', JSON.stringify(csrf));
    setUser(user);
  };
  const logout = async () => {
    await api.get('/users/auth/logout');
    localStorage.removeItem('csrf');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
