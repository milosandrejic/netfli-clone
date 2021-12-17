import React, {Component} from "react";
import {ThemeProvider, createGlobalStyle} from "styled-components";

import {defaultTheme} from "themes";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

export default class Wrapper extends Component {
    render () {
        return (
            <>
                <GlobalStyle />
                <ThemeProvider theme={defaultTheme}>
                    {this.props.children}
                </ThemeProvider>
            </>
        );
    }
}
