import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/login"} component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
