import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import CreateUser from "./pages/UserPages/CreateUser";
import Home from "./pages/Home";
import Login from "./pages/UserPages/Login";
import Profile from "./pages/UserPages/Profile";
import EditPw from "./pages/UserPages/EditPw";
import EditImg from "./pages/UserPages/EditImg";
import Account from "./pages/AccountPages/Account";
import AccountDetail from "./pages/AccountPages/AccountDetail";
import LoginCheck from "./components/LoginCheck";
import Fassion from "./pages/Fassion/Fassion";
import MyStyle from "./pages/Fassion/MyStyle";
import Uploads from "./pages/Fassion/Uploads";
import OthersStyle from "./pages/Fassion/OthersStyle";
import Food from "./pages/Food/Food";

function App() {
  return (
    <BrowserRouter>
      <LoginCheck />
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/user"} component={Profile} />
        <Route exact path={"/user/create"} component={CreateUser} />
        <Route exact path={"/user/edit/pw"} component={EditPw} />
        <Route exact path={"/user/edit/img"} component={EditImg} />
        <Route exact path={"/account"} component={Account} />
        <Route exact path={"/account/detail"} component={AccountDetail} />
        <Route exact path={"/fassion"} component={Fassion} />
        <Route exact path={"/fassion/my"} component={MyStyle} />
        <Route exact path={"/fassion/others"} component={OthersStyle} />
        <Route exact path={"/fassion/uploads"} component={Uploads} />
        <Route exact path={"/food"} component={Food} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
