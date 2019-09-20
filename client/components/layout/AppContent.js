import React from "react";
import WorkdaysContainer from "../WorkdaysContainer/components/WorkdaysContainer";
import StatusTable from "../StatusTable/components/StatusTable";
import WorkStats from "../WorkStats/components/WorkStats";
import classNames from "./scss/AppContent.module.scss";
import { connect } from "react-redux";
import * as actions from "../WorkdaysContainer/actions";
import ContractInfo from "../ContractInfo/components/ContractInfo";
import { Switch, Route } from "react-router";

export class AppContent extends React.Component {
    render() {
        const authorized = this.props.authorized;

        const workdayContainer = () => (
            <WorkdaysContainer>
                <StatusTable className={classNames["app-content__main"]} />
                <WorkStats
                    className={classNames["app-content__right-column"]}
                />
            </WorkdaysContainer>
        );
        const contractInfo = () => (
            <ContractInfo
                className={classNames["app-content__contract-info"]}
            />
        );

        if (!authorized) {
            return null;
        } else {
            return (
                <div className={classNames["app-content"]} data-test-component="AppContent">
                    <Switch>
                        <Route exact path="/" component={workdayContainer} />
                        <Route path="/contracts" component={contractInfo } />
                        <Route path="/office" component={ () => ("office") } />
                        <Route path="/remarks" component={ () => ("remarks") } />
                    </Switch>
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
