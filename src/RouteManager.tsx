import React from "react";
import { Route, Switch } from "react-router-dom";
import { PropertiesScreen } from "./screens/Properties";
import { PropertyScreen } from "./screens/Property";
import { NewStoreScreen } from "./screens/NewStore";

export const RouteManager = () => {
  return (
    <Switch>
      <Route path="/properties" component={PropertiesScreen} />
      <Route path="/property/:id" component={PropertyScreen} />
      <Route path="/owner/new-store" component={NewStoreScreen} />
    </Switch>
  );
};
