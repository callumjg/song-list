import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import React from 'react';
import fs from 'fs';
import path from 'path';
import App from '../../client/components/App';

const renderApp = () => {
  if (process.env.NODE_ENV !== 'production') return (req, res, next) => next();

  const template = fs.readFileSync(
    path.resolve(__dirname, '../../../dist/public/template.html'),
    'utf8'
  );

  return (req, res) => {
    const content = ReactDOMServer.renderToStaticMarkup(
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    );
    const html = template.replace('<!-- APP -->', content);
    res.send(html);
  };
};

export default renderApp;
