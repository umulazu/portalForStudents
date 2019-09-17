import { createRoutine } from "redux-saga-routines";
import { createAction } from "redux-actions";

export const init = createAction("INIT");

export const contractsLoadRoutine = createRoutine("CONTRACTS_LOAD");