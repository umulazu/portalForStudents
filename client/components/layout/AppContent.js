import React from "react";
import WorkdaysContainer from "../WorkdaysContainer/components/WorkdaysContainer";
import StatusTable from "../StatusTable/components/StatusTable";
import WorkStats from "../WorkStats/components/WorkStats";
import classNames from "./scss/AppContent.module.scss";
import { connect } from "react-redux";
import * as actions from "../WorkdaysContainer/actions";
import ContractInfo from "../ContractInfo/components/ContractInfo";

export class AppContent extends React.Component {
    render() {
        const authorized = this.props.authorized;
        const pageNumber = this.props.pageNumber;

        const CONTENT_PAGES = [
            <div>
                офис
            </div>,
            <WorkdaysContainer>
                <StatusTable className={classNames["app-content__main"]} />
                <WorkStats
                    className={classNames["app-content__right-column"]}
                />
            </WorkdaysContainer>,
            <ContractInfo className={classNames["app-content__contract-info"]} />,
        ];

        if (!authorized) {
            return null;
        } else {
            return (
                <div className={classNames["app-content"]} data-test-component="AppContent">
                    {CONTENT_PAGES[pageNumber]}
                </div>
            );
        }
    }
}

export default connect(
    state => ({
        authorized: state.application.authorized,
        pageNumber: state.application.pageNumber
    }),
    actions
)(AppContent);
