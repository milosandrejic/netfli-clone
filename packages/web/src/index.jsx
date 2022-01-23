import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
    <div>web</div>,
    document.getElementById("root")
);

if ("service-worker" in navigatior) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
    });
}
