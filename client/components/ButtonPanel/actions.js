import { createAction } from "redux-actions";
import { createRoutine } from "redux-saga-routines";

export const init = createAction("INIT");

export const loadCurrentDayRoutine = createRoutine("LOAD_CURRENT_DAY");

export const startRoutine = createRoutine("START");
export const finishRoutine = createRoutine("FINISH");