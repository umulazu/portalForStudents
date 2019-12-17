import React, { Component } from "react";
import AppBar from "./AppBar";
import classNames from "./scss/AppView.module.scss";
import AppContent from "./AppContent";

class AppView extends Component {
    render() {
        return (
            <div className={classNames.appview}>
                <AppBar />
                <AppContent />
            </div>
        );
    }
}

export default AppView;