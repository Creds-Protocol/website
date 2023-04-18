import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
import App from "./App.js";
import { Wallet } from "./components/Wallet.js";
import {UserProfile} from "./components/UserProfile.js";
import { Landing } from "./components/Landing.js";
import reportWebVitals from "./reportWebVitals";
import { MetaMaskProvider } from "metamask-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
    <MetaMaskProvider>
        <Switch>
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/wallet" exact component={Wallet} />
          <Route path="/profile" exact component={UserProfile} />
          <Route path="/" exact component={App} />
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
     </MetaMaskProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
