import React, { useState } from "react";
import Hamburger from "./Hamburger";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import { history } from "../App";
import "./Nav.scss";

const Nav: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState("");
  useBodyScrollLock(isNavOpen);

  return (
    <div>
      <Hamburger onClick={() => setIsNavOpen(" open")} />
      <nav>
        <div
          className={`nav-container${isNavOpen}`}
          onClick={() => setIsNavOpen("")}
        >
          <div className={`nav-slider${isNavOpen}`}>
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
