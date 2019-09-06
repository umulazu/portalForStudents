import React, { Component } from "react";
import DateControl from "../DateControl";
import classNames from "./scss/AppBar.module.scss";
import rightColumnClassNames from "./scss/RightColumn.module.scss";
import ButtonPanel from "../ButtonPanel/components/ButtonPanel";
import RightColumn from "../RightColumn";
import NavBar from "../NavBar/components/NavBar";

class AppBar extends Component {
    render() {
        return (
            <div className={classNames.appbar}>
                <DateControl className={classNames["appbar__date-control"]} />
                <ButtonPanel />
                <NavBar />
                <RightColumn rightColumnClassNames={rightColumnClassNames}/>
            </div>
        );
    }
}

export default AppBar;
