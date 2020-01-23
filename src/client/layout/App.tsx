import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route } from "react-router-dom";
import Header from "./Header";
import SongsPage from "../pages/songs/SongsPage";
import ServicesList from "../pages/services/ServicesList";
import Metrics from "../pages/metrics/Metrics";
import Footer from "./Footer";
import "./App.scss";
// import "./App-dev.scss";

export const history = createBrowserHistory();

// import "../styles/layout-dev.scss";
class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <Header />
        </header>
        <main>
          <div>
            <Router history={history}>
              <Route path="/" component={SongsPage} exact />
              <Route path="/services" component={ServicesList} exact />
              <Route path="/metrics" component={Metrics} exact />
            </Router>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    );
  }
}

export default App;
