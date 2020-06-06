import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SongsPage from '../pages/SongsPage';
import ServicesPage from '../pages/ServicesPage';
import MetricsPage from '../pages/MetricsPage';
import SongFormModal from './forms/SongForm/SongFormModal';
// import "../styles/layout-dev.scss";

const Router = () => (
  <>
    <Switch>
      <Route path="/services" component={ServicesPage} exact />
      <Route path="/metrics" component={MetricsPage} exact />
      <Route path="/" component={SongsPage} />
    </Switch>
    <Route path="/songs/add" component={SongFormModal} exact />
  </>
);

export default Router;
