import React from "react";
import { Router, Route } from "react-router-dom";
import { history } from "../utils";
import Header from "./header/Header";
import Home from "./home/Home";
import ServicesList from "./services/ServicesList";
import Metrics from "./metrics/Metrics";
import Footer from "./footer/Footer";
import "../styles/main.scss";
// import "../styles/layout-dev.scss";
class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<section>
					<main>
						<Router history={history}>
							<Route path="/" component={Home} exact />
							<Route path="/services" component={ServicesList} exact />
							<Route path="/metrics" component={Metrics} exact />
						</Router>
					</main>
				</section>
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
