import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import {createGlobalStyle, ThemeProvider} from "styled-components";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Navigation from "common/navigation";
import Home from "pages/home";

import {
    defaultTheme
} from "common/themes";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: ${({theme}) => theme.font};
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${({theme}) => theme.background};
    }
`;

ReactDOM.render(
    <Router>
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <Navigation />
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </ThemeProvider>
    </Router>,
    document.getElementById("root")
);

if ("service-worker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
    });
}
