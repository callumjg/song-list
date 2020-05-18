import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import fs from 'fs';
import path from 'path';
import App from '../../client/components/App';
import reducers from '../../client/reducers';
const template =
  process.env.NODE_ENV === 'test'
    ? ''
    : fs.readFileSync(
        path.resolve(__dirname, '../../../dist/public/template.html'),
        'utf8'
      );

const renderApp = (req, res) => {
  const content = ReactDOMServer.renderToStaticMarkup(
    <Provider store={createStore(reducers)}>
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const html = template.replace('<!-- APP -->', content);
  res.send(html);
};

export default renderApp;
