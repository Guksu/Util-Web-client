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
import Fassion from "./pages/FassionPages/Fassion";
import MyStyle from "./pages/FassionPages/MyStyle";
import Uploads from "./pages/FassionPages/Uploads";
import OthersStyle from "./pages/FassionPages/OthersStyle";
import Food from "./pages/FoodPages/Food";
import FoodReviewBoard from "./pages/FoodPages/FoodReviewBoard";
import FoodReviewCreate from "./pages/FoodPages/FoodReviewCreate";
import FoodReview from "./pages/FoodPages/FoodReview";
import FoodReviewEdit from "./pages/FoodPages/FoodReviewEdit";
import { GlobalStyles } from "./style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { isDarkThemAtom } from "./atom";
import { darkThem, lightThem } from "./them";
import { useRecoilValue } from "recoil";
import ChatRoom from "./pages/FleaMarket/ChatRoom";
import FleaMarketHome from "./pages/FleaMarket/FleaMarketHome";
import FleaMarketProduct from "./pages/FleaMarket/FleaMarketProduct";
import FleaMarketCreate from "./pages/FleaMarket/FleaMarketCreate";
import FleaMarketEdit from "./pages/FleaMarket/FleaMarketEdit";

function App() {
  const isDark = useRecoilValue(isDarkThemAtom);
  return (
    <ThemeProvider theme={isDark === "lightTheme" ? lightThem : darkThem}>
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
          <Route exact path={"/food/reviewList"} component={FoodReviewBoard} />
          <Route exact path={"/food/create"} component={FoodReviewCreate} />
          <Route exact path={"/food/review/:id"} component={FoodReview} />
          <Route
            exact
            path={"/food/review/edit/:id"}
            component={FoodReviewEdit}
          />
          <Route exact path={"/fleaMarket"} component={FleaMarketHome} />
          <Route
            exact
            path={"/fleaMarket/create"}
            component={FleaMarketCreate}
          />
          <Route
            exact
            path={"/fleaMarket/product/:id"}
            component={FleaMarketProduct}
          />
          <Route
            exact
            path={"/fleaMarket/edit/:id"}
            component={FleaMarketEdit}
          />
          <Route exact path={"/fleaMarket/chatroom/:id"} component={ChatRoom} />
        </Switch>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
