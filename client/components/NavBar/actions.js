import { createAction } from "redux-actions";
import { createRoutine } from "redux-saga-routines";

export const init = createAction("INIT");

export const changePage = createRoutine("CHANGE_PAGE");