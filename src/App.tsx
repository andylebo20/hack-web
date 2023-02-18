import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RouteManager } from "./RouteManager";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <RouteManager />
    </Router>
  );
}

export default App;
