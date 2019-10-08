import React from "react";
import Header from "./header/Header";
import Home from "./home/Home";
import Footer from "./footer/Footer";
import "../styles/main.scss";
class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<section>
					<main>
						<Home />
					</main>
				</section>
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
