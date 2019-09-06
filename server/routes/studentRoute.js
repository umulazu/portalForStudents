import express from "express";
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import {
    getWorkdaysForMonth,
    getWorkdaysForMonthWithTimestamps,
} from "../mongoose/api/workdays";
import { getStudentById } from "../mongoose/api/student";

const router = express.Router();

router
    .route("/workdays")
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        (async () => {
            const workdays = await getWorkdaysForMonth(req.body._id);
            res.json(workdays);
        })();
    });

router
    .route("/detailedWorkdays")
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        (async () => {
            const workdays = await getWorkdaysForMonthWithTimestamps(
                req.body._id
            );
            res.json(workdays);
        })();
    });

router
    .route("/studentInfo")
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        (async () => {
            const student = await getStudentById(req.body._id);
            res.json(student);
        })();
    });

export default router;
