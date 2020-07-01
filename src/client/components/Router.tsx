import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SongsPage from '../pages/SongsPage';
import SongPage from '../pages/SongPage';
import ServicesPage from '../pages/ServicesPage';
import MetricsPage from '../pages/MetricsPage';
import SongFormModal from './forms/SongForm/SongFormModal';
import ServiceFormModal from './forms/ServiceForm/ServiceFormModal';
import LoginModal from './forms/LoginForm/LoginModal';
// import "../styles/layout-dev.scss";

const Router = () => (
  <>
    <Switch>
      <Route path="/services" component={ServicesPage} />
      <Route path="/metrics" component={MetricsPage} />
      <Route path="/songs/:songId" component={SongPage} />
      <Route path="/" component={SongsPage} />
    </Switch>
    <Switch>
      <Route path="*/login" component={LoginModal} />
      <Route path="/songs/add" component={SongFormModal} />
      <Route path="/services/add" component={ServiceFormModal} />
    </Switch>
  </>
);

export default Router;
