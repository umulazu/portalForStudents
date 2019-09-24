import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startRoutine, finishRoutine, loadCurrentDayRoutine } from "../actions";
import getClassNames from "../../../utilities/getClassnames";
import classNames from "./scss/ButtonPanel.module.scss";
import * as selectors from "../selectors";
import * as rootSelectors from "../../../rootSelectors";

const ButtonPanel = () => {
    const dispatch = useDispatch();

    const handleStartClick = useCallback(
        () => dispatch(startRoutine.trigger()),
        [dispatch]
    );
    const handleFinishClick = useCallback(
        () => dispatch(finishRoutine.trigger()),
        [dispatch]
    );

    const authorized = useSelector(selectors.isAuthorized);
    const startSelected = useSelector(rootSelectors.isStarted);

    useEffect(() => {
        authorized && dispatch(loadCurrentDayRoutine.trigger());
    }, [authorized, dispatch]);

    if (!authorized) {
        return null;
    }

    const { button } = classNames;
    const button_highlighted = classNames["button--highlighted"];
    const startClasses = getClassNames({
        [button]: true,
        [button_highlighted]: !startSelected,
    });
    const finishClasses = getClassNames({
        [button]: true,
        [button_highlighted]: startSelected,
    });

    const button_panel = classNames["button-panel"];

    return (
        <div className={button_panel} data-test-component="ButtonPanel">
            <button
                onClick={handleStartClick}
                className={startClasses}
                disabled={startSelected}
            >
                НАЧАТЬ
            </button>
            <button
                onClick={handleFinishClick}
                className={finishClasses}
                disabled={!startSelected}
            >
                ЗАКОНЧИТЬ
            </button>
        </div>
    );
};

export default ButtonPanel;
