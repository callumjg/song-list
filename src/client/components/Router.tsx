import React from "react";
import { Route, Switch } from "react-router-dom";
import SongsPage from "../pages/SongsPage";
import ServicesPage from "../pages/ServicesPage";
import MetricsPage from "../pages/MetricsPage";

import "./App.scss";
// import "../styles/layout-dev.scss";

const Router = () => (
  <Switch>
    <Route path="/" component={SongsPage} exact />
    <Route path="/services" component={ServicesPage} exact />
    <Route path="/metrics" component={MetricsPage} exact />
  </Switch>
);

export default Router;
