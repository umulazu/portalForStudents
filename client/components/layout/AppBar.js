import React, { Component } from "react";
import UserControls from "../Authorization/components/UserControls";
import DateControl from "../DateControl";
import ButtonPanel from "../ButtonPanel/components/ButtonPanel";
import classNames from "./scss/Appbar.module.scss";

class AppBar extends Component {
    render() {
        return (
            <div className={classNames.appbar}>
                <DateControl />
                <ButtonPanel />
                <UserControls />
            </div>
        );
    }
}

export default AppBar;
