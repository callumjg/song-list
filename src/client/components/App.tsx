import React, { Suspense, lazy } from "react";
import Loader from "./Loader";

const Router = lazy(() => import("./Router"));

const App = () => (
  <Suspense fallback={<Loader loading />}>
    <Router />
  </Suspense>
);

export default App;
