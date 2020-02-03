import React, { Suspense, lazy } from "react";
import { createBrowserHistory } from "history";
import { Router, Route } from "react-router-dom";
import "./App.scss";

const SongsPage = lazy(() => import("../pages/SongsPage"));
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const MetricsPage = lazy(() => import("../pages/MetricsPage"));
// import "./App-dev.scss";

export const history = createBrowserHistory();

// import "../styles/layout-dev.scss";
const App = () => (
  <Router history={history}>
    <Suspense fallback={<div>Lazy loading</div>}>
      <Route path="/" component={SongsPage} exact />
      <Route path="/services" component={ServicesPage} exact />
      <Route path="/metrics" component={MetricsPage} exact />
    </Suspense>
  </Router>
);

export default App;
