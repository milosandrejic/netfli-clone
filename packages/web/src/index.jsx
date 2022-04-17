import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import {createGlobalStyle, ThemeProvider} from "styled-components";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
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
        color: ${({theme}) => theme.foreground};
    }
`;

ReactDOM.render(
    <Router>
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <Navigation />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/browse" />
                </Route>
                <Route path="/browse" component={Home} />
            </Switch>
        </ThemeProvider>
    </Router>,
    document.getElementById("root")
);
