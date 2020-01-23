import React, { useState } from "react";
import Hamburger from "./Hamburger";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import { history } from "../App";
import "./Nav.scss";

const Nav: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navStatus = isNavOpen ? " open" : "";

  useBodyScrollLock(isNavOpen);

  return (
    <div>
      <Hamburger onClick={() => setIsNavOpen(true)} />
      <nav>
        <div
          className={`nav-container${navStatus}`}
          onClick={() => setIsNavOpen(false)}
        >
          <div className={`nav-slider${navStatus}`}>
            <i className="ui delete icon" />
            <ul>
              <li onClick={() => history.push("/")}>Songs</li>
              <li onClick={() => history.push("/metrics")}>Metrics</li>
              <li onClick={() => history.push("/services")}>Services</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
