import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <h1 className="header">Time Tracker App</h1>
      <Switch>
        <Route exact path="/time-tracker-frontend" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

export default App;
