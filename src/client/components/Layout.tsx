import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import history from "../constants/history";

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
  const defaultLinks = [
    { onClick: () => history.push("/"), label: "Songs" },
    { onClick: () => history.push("/metrics"), label: "Metrics" },
    { onClick: () => history.push("/services"), label: "Services" },
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
