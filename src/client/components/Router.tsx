import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SongsPage from '../pages/SongsPage';
import SongDetailsPage from '../pages/SongDetailsPage';
import ServicesPage from '../pages/ServicesPage';
import MetricsPage from '../pages/MetricsPage';
import SongFormModal from './forms/SongForm/SongFormModal';
import ServiceFormModal from './forms/ServiceForm/ServiceFormModal';
import LoginModal from './forms/LoginForm/LoginModal';

const Router = () => (
  <>
    <Switch>
      <Route path="/services" component={ServicesPage} />
      <Route path="/metrics" component={MetricsPage} />
      <Route path={['/', '/songs/add']} component={SongsPage} exact />
    </Switch>
    <Switch>
      <Route path="/songs/add" component={SongFormModal} />
      <Route path="/songs/:songId" component={SongDetailsPage} exact />
      <Route path="*/login" component={LoginModal} />
      <Route path="/services/add" component={ServiceFormModal} />
    </Switch>
  </>
);

export default Router;
