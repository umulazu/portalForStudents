import { createAction } from "redux-actions";
import { createRoutine } from "redux-saga-routines";

export const init = createAction("INIT");

export const workdaysLoad = createRoutine("WORKDAYS_LOAD");
export const workdaysContainerClose = createRoutine("WORKDAYS_CONTAINER_CLOSE");
