import express from "express";
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import { getHoursPerDay } from "../mongoose/api/contract";

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

export default router;
