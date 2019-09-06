import React from "react";
import OnHoverComponent from "./OnHoverComponent";
import StudentName from "./StudentInfo/components/StudentName";
import StudentCard from "./StudentInfo/components/StudentCard";
import UserControls from "./Authorization/components/UserControls";

const RightColumn = ({rightColumnClassNames}) => {
    const classNames = rightColumnClassNames;

    return (
        <div className={classNames["right-column"]}>
            <OnHoverComponent
                className={classNames["right-column__on-hover-component"]}
                hoveringComponent={<StudentCard />}
            >
                <StudentName />
            </OnHoverComponent>
            <UserControls className={classNames["right-column__user-controls"]}/>
        </div>
    );
};

export default RightColumn;