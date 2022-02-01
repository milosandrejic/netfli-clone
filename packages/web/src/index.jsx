import React from "react";
import ReactDOM from "react-dom";

import {
    Typography
} from "common/widgets";

const sections = [
    {
        title: "Home",
        route: "/"
    },
    {
        title: "TV Shows",
        route: "/tv-shows"
    },
    {
        title: "Movies",
        route: "/movies"
    },
    {
        title: "New & Popular",
        route: "/new&popular"
    },
    {
        title: "My List",
        route: "/favorites"
    }
];

ReactDOM.render(
    <>
        <Typography>H1</Typography>
    </>,
    document.getElementById("root")
);

if ("service-worker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
    });
}
