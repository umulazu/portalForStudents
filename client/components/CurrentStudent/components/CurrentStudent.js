import React, { useEffect } from "react";
import OnHoverComponent from "../../OnHoverComponent";
import StudentName from "./StudentName";
import StudentCard from "./StudentCard";
import StudentControls from "../../Authorization/components/StudentControls";
import classNames from "./scss/CurrentStudent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../selectors";
import * as rootSelectors from "../../../rootSelectors";
import { loadStudentRoutine } from "../actions";

const CurrentStudent = ({ className }) => {
    const dispatch = useDispatch();
    // const n = useSelector(state => {
    //     console.log(state);
    // });
    const authorized = useSelector(selectors.isAuthorized);
    const login = useSelector(rootSelectors.getStudentId);

    useEffect(
        () => {
            authorized && login && dispatch(loadStudentRoutine.trigger({ login }))
        }, [login, dispatch, authorized]
    );

    return (
        <div className={className}>
            {authorized &&
                <OnHoverComponent
                    className={classNames["current-student__on-hover-component"]}
                    hoveringComponent={<StudentCard />}
                >
                    <StudentName />
                </OnHoverComponent>
            }

            <StudentControls
                className={classNames["current-student__controls"]}
            />
        </div>
    );
};

export default CurrentStudent;