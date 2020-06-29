import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import history from '../constants/history';

interface Props {
  header?: React.Component;
  footer?: React.Component;
  noHeader?: boolean;
  noFooter?: boolean;
}

const Layout: React.FC<Props> = ({
  header,
  footer,
  children,
  noFooter,
  noHeader,
}) => {
  const location = useLocation();
  const login = () => {};
  const logout = login;

  const defaultLinks = [
    { onClick: () => history.push('/'), label: 'Songs' },
    { onClick: () => history.push('/metrics'), label: 'Metrics' },
    { onClick: () => history.push('/services'), label: 'Services' },
    {
      onClick: () => {
        const newPath =
          location.pathname === '/' ? '/login' : `${location.pathname}/login`;
        history.push(newPath);
      },
      label: 'Login',
    },
    { onClick: logout, label: 'logout' },
  ];
  return (
    <>
      <header>
        {noHeader || header || <Header navLinks={defaultLinks} />}
      </header>
      <main>
        <div>{children}</div>
      </main>
      <footer>{noFooter || footer || <Footer />}</footer>
    </>
  );
};

export default Layout;
