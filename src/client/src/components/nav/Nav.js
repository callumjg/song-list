import React from "react";
import { history } from "../../utils";
import "./Nav.scss";
const Nav = props => (
	<nav>
		<ul>
			<li onClick={() => history.push("/")}>Songs</li>
			<li onClick={() => history.push("/metrics")}>Metrics</li>
			<li onClick={() => history.push("/services")}>Services</li>
		</ul>
	</nav>
);

export default Nav;
