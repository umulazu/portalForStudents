import express from "express";
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import { getContractsByStudentId, getHoursPerDay } from "../mongoose/api/contract";

const router = express.Router();

router
    .route("/hoursPerDay")
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        (async () => {
            const hoursPerDay = await getHoursPerDay(req.body._id);
            res.json(hoursPerDay);
        })();
    });

router
    .route("/getContracts")
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        (async () => {
            const contracts = await getContractsByStudentId(req.body._id);
            res.json(contracts);
        })();
    });

export default router;
