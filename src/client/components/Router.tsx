import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SongsPage from '../pages/SongsPage';
import ServicesPage from '../pages/ServicesPage';
import MetricsPage from '../pages/MetricsPage';
// import "../styles/layout-dev.scss";

const Router = () => (
  <Switch>
    <Route path="/services" component={ServicesPage} exact />
    <Route path="/metrics" component={MetricsPage} exact />
    <Route path="/" component={SongsPage} />
  </Switch>
);

export default Router;
