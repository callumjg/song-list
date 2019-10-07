import React from "react";
import "./Client.css";
import Home from "./Home";

class Client extends React.Component {
	render() {
		return (
			<React.Fragment>
				<header>
					<nav>
						<h3>Navigation bar</h3>
					</nav>
				</header>
				<section>
					{/* <aside>Aside</aside> */}
					<main>
						<Home />
					</main>
				</section>
				<footer>Footer</footer>
			</React.Fragment>
		);
	}
}

export default Client;
