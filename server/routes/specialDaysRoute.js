import express from "express";
import {
    addHolidays,
    addPostponedDays,
    getSpecialDays,
} from "../mongoose/api/specialDays";
import { parseHolidaysCalendar } from "../calendar/parser";
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";

const router = express.Router();

const path = "../calendar/russia.ics";

// todo: for admin
// client/server: where does one have to give calendar??
// here we could get req.body.calendar .ics -> invoke parser -> addHolidays   OR   get path  to .ics -> - - - - -
router.route("/setHolidays").post((req, res) => {
    (async () => {
        const calendarPath = "..//russia.ics";
        const holidays = parseHolidaysCalendar(calendarPath);
        await addHolidays(holidays);
        res.end();
    })();
});

router.route("/setPostponedDays").post((req, res) => {
    (async () => {
        const postponedDays = [];
        await addPostponedDays(postponedDays);
        res.end();
    })();
});

// for standard user
router
    .route("/getSpecialDays")
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        (async () => {
            const specialDays = await getSpecialDays();
            res.json(specialDays);
        })();
    });

export default router;
