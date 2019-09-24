import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "./scss/WorkStats.module.scss";
import { statsLoad, statsClose } from "../actions";
import * as selectors from "../selectors";
import getClassNames from "../../../utilities/getClassnames";
import CurrentWorkTime from "./CurrentWorkTime";

const WorkStats = props => {
    const dispatch = useDispatch();
    const { normOfMonth } = useSelector(selectors.getStaticData);

    useEffect(() => {
        dispatch(statsLoad.trigger());

        return () => {
            dispatch(statsClose());
        }
    }, [dispatch]);

    if (!normOfMonth) {
        return null;
    }

    const { className } = props;
    const containerClasses = getClassNames({
        [className]: true,
        [classNames["work-stats"]]: true,
    });
    return (
        <div className={containerClasses}>
            <div className={classNames["work-stats__statistic"]}>
                Статистика:
            </div>
            <CurrentWorkTime
                className={classNames["work-stats__rest-for-current-day"]}
                classModifier={classNames["work-stats__rest-for-current-day_over-the-norm"]}
            />
            <div>Норма за месяц: {normOfMonth}</div>
        </div>
    );
};

export default WorkStats;
