import React from "react";
import ReactDOM from "react-dom";
import "./assets/animated.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/elegant-icons/style.css";
import "../node_modules/et-line/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./assets/style.scss";
import "./assets/style_grey.scss";
import App from "./components/app";

import { UseWalletProvider } from "use-wallet";
import { Provider } from "react-redux";

//redux store
import store from "./store";
// context store
import ContextProvider from "./context";

ReactDOM.render(
    <UseWalletProvider
        chainId={4002}
        connectors={{
            // This is how connectors get configured
            portis: { dAppId: "airdrop" },
        }}
    >
        <ContextProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ContextProvider>
    </UseWalletProvider>,
    document.getElementById("root")
);
