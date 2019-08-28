import { createAction } from "redux-actions";
import { createRoutine } from "redux-saga-routines";

export const init = createAction("INIT");

export const statsLoad = createRoutine("STATS_LOAD");
export const statsClose = createRoutine("STATS_CLOSE");
