import React from "react";
import { Router, Location, Redirect } from "@reach/router";
import { NotificationContainer } from "react-notifications";

import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Home from "./pages/home";
import MarketPlace from "./pages/marketplace";
import MyPage from "./pages/mypage";
import ItemDetail from "./pages/ItemDetail";
import MyItemDetail from "./pages/myItemDetail";

import { createGlobalStyle } from "styled-components";
import "react-notifications/lib/notifications.css";
const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
    React.useEffect(() => window.scrollTo(0, 0), [location]);
    return children;
};

const PosedRouter = ({ children }) => (
    <Location>
        {({ location }) => (
            <div id="routerhang">
                <div key={location.key}>
                    <Router location={location}>{children}</Router>
                </div>
            </div>
        )}
    </Location>
);

const App = () => (
    <div className="wraper">
        <GlobalStyles />
        <NotificationContainer />
        <Header />
        <PosedRouter>
            <ScrollTop path="/">
                <Home path="/" />
                <MarketPlace path="/market" />
                <MyPage path="/mypage" />
                <ItemDetail path="/create/:nftId" />
                <MyItemDetail path="/view/:nftId" />
            </ScrollTop>
        </PosedRouter>
        <ScrollToTopBtn />
    </div>
);

export default App;
