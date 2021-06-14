import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import { useApolloClient } from "@apollo/client";

function App() {
  return (
    <div className="App">
      <h1>App page </h1>

      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

export default App;
