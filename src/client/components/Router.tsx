import React, { Suspense, lazy } from "react";
import { createBrowserHistory } from "history";
import { Router as ReactRouter, Route, Switch } from "react-router-dom";
import Loader from "./Loader";
import "./App.scss";

const SongsPage = lazy(() => import("../pages/SongsPage"));
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const MetricsPage = lazy(() => import("../pages/MetricsPage"));
// import "./App-dev.scss";

export const history = createBrowserHistory();

// import "../styles/layout-dev.scss";
const Router = () => (
  <ReactRouter history={history}>
    <Suspense fallback={<Loader loading />}>
      <Switch>
        <Route path="/" component={SongsPage} exact />
        <Route path="/services" component={ServicesPage} exact />
        <Route path="/metrics" component={MetricsPage} exact />
      </Switch>
    </Suspense>
  </ReactRouter>
);

export default Router;
