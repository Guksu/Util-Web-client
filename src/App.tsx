import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import CreateUser from "./pages/CreateUser";
import EditImg from "./pages/EditImg";
import EditPw from "./pages/EditPw";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/user"} component={Profile} />
        <Route exact path={"/user/create"} component={CreateUser} />
        <Route exact path={"/user/edit/pw"} component={EditPw} />
        <Route exact path={"/user/edit/img"} component={EditImg} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
