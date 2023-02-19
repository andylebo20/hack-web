import React from "react";
import { Route, Switch } from "react-router-dom";
import { PropertiesScreen } from "./screens/Properties";
import { PropertyScreen } from "./screens/Property";
import { NewStoreScreen } from "./screens/NewStore";
import { SuccessfulReservationScreen } from "./screens/SuccessfulReservation";
import { HEADER_HEIGHT, Header } from "./sharedComponents/Header";
import { StylesType } from "./styles";
import { Colors } from "./colors";
import { StatsScreen } from "./screens/StatsScreen";

export const RouteManager = () => {
  return (
    <Switch>
      <div style={styles.container}>
        <Header />
        <div style={styles.innerContainer}>
          <Route path="/properties" component={PropertiesScreen} />
          <Route path="/property/:id" component={PropertyScreen} />
          <Route path="/owner/new-store" component={NewStoreScreen} />
          <Route path="/owner/stats" component={StatsScreen} />
          <Route
            path="/checkout-success/:id"
            component={SuccessfulReservationScreen}
          />
        </div>
      </div>
    </Switch>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: HEADER_HEIGHT,
  },
};
