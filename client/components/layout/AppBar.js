import React, { Component } from "react";
import DateControl from "../DateControl";
import classNames from "./scss/AppBar.module.scss";
import ButtonPanel from "../ButtonPanel/components/ButtonPanel";
import CurrentStudent from "../CurrentStudent/components/CurrentStudent";
import NavBar from "../NavBar/components/NavBar";

class AppBar extends Component {
    render() {
        return (
            <div className={classNames["app-bar"]}>
                <DateControl className={classNames["app-bar__date-control"]} />
                <ButtonPanel />
                <NavBar />
                <CurrentStudent
                    className={classNames["app-bar__current-student"]}
                />
            </div>
        );
    }
}

export default AppBar;
