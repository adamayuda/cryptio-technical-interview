import "./style.sass";

import React, { FC, Suspense, lazy } from "react";

import { Route, Switch } from "react-router-dom";

import { Loading } from "src/components/loading";

const routes = [
  {
    import: import("src/pages/home"),
    path: "/",
    exact: true,
  },
];

export const App: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {routes.map((route, index: number) => (
          <Route
            {...route}
            key={`route-${index}`}
            component={lazy(() => route.import)}
          />
        ))}
      </Switch>
    </Suspense>
  );
};
