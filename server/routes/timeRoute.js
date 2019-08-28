import express from "express";
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import { addStartTime, addFinishTime } from "../mongoose/api/workdays";

const router = express.Router();

router
    .route("/start")
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        (async () => {
            const currentDay = await addStartTime(req.body._id);
            res.json(currentDay);
        })();
    });

router
    .route("/finish")
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        (async () => {
            const currentDay = await addFinishTime(req.body._id);
            res.json(currentDay);
        })();
    });

export default router;
