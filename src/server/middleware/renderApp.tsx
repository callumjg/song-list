import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import React from "react";
import fs from "fs";
import path from "path";
import App from "../../client/components/App";

const template =
  process.env.NODE_ENV === "test"
    ? ""
    : fs.readFileSync(
        path.resolve(__dirname, "../../../dist/public/template.html"),
        "utf8"
      );

const renderApp = (req, res) => {
  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  );
  const html = template.replace("<!-- APP -->", content);
  res.send(html);
};

export default renderApp;
