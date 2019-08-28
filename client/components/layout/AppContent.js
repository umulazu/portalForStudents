import React from "react";
import WorkdaysContainer from "../WorkdaysContainer/components/WorkdaysContainer";
import StatusTable from "../StatusTable/components/StatusTable";
import WorkStats from "../WorkStats/components/WorkStats";
import classNames from "./scss/AppContent.module.scss";
import { connect } from "react-redux";
import * as actions from "../WorkdaysContainer/actions";

export class AppContent extends React.Component {
    render() {
        const authorized = this.props.authorized;

        if (!authorized) {
            return null;
        } else {
            return (
                <div className={classNames["app-content"]} data-test-component="AppContent">
                    <WorkdaysContainer>
                        <StatusTable className={classNames["app-content__main"]} />
                        <WorkStats
                            className={classNames["app-content__right-column"]}
                        />
                    </WorkdaysContainer>
                </div>
            );
        }
    }
}

export default connect(
    state => ({
        authorized: state.application.authorized,
    }),
    actions
)(AppContent);