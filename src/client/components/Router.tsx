import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SongsPage from '../pages/SongsPage';
import ServicesPage from '../pages/ServicesPage';
import MetricsPage from '../pages/MetricsPage';
import SongFormModal from './forms/SongForm/SongFormModal';
import ServiceFormModal from './forms/ServiceForm/ServiceFormModal';
// import "../styles/layout-dev.scss";

const Router = () => (
  <>
    <Switch>
      <Route path="/services" component={ServicesPage} exact />
      <Route path="/metrics" component={MetricsPage} exact />
      <Route path="/" component={SongsPage} />
    </Switch>
    <Switch>
      <Route path="/songs/add" component={SongFormModal} exact />
      <Route path="/services/add" component={ServiceFormModal} exact />
    </Switch>
  </>
);

export default Router;
