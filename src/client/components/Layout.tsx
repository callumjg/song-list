import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from './Auth';
import Nav from './Nav';
import Footer from './Footer';
import './Layout.scss';

interface Props {
  header?: React.Component;
  footer?: React.Component;
  noHeader?: boolean;
  noFooter?: boolean;
  activeTab?: string;
}

const Layout: React.FC<Props> = ({
  header,
  footer,
  children,
  noFooter,
  noHeader,
  activeTab,
}) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  const defaultLinks = [
    { onClick: () => history.push('/'), label: 'Songs' },
    { onClick: () => history.push('/metrics'), label: 'Metrics' },
    { onClick: () => history.push('/services'), label: 'Services' },
  ];
  defaultLinks.push(
    user
      ? { onClick: logout, label: 'logout' }
      : {
          onClick: () => {
            const newPath =
              location.pathname === '/'
                ? '/login'
                : `${location.pathname}/login`;
            history.push(newPath);
          },
          label: 'Login',
        }
  );
  return (
    <>
      <header>
        {noHeader || header || (
          <Nav links={defaultLinks} activeTab={activeTab} />
        )}
      </header>
      <main>
        <div>{children}</div>
      </main>
      <footer>{noFooter || footer || <Footer />}</footer>
    </>
  );
};

export default Layout;
