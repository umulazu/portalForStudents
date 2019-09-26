// starting this script alone:   node -r esm parserInvoke

import { parseHolidaysCalendar } from "./parser";
import { addHolidays, getSpecialDays } from "../mongoose/api/specialDays";
import mongoose from "mongoose";

// adding Holidays
const path = './russia.ics';
const holidays = parseHolidaysCalendar(path);
(async () => {
    await mongoose.connect("mongodb://localhost:27017/PortalForStudents", { useNewUrlParser: true });
    await addHolidays(holidays);
    await mongoose.disconnect();
})();

// getting SpecialDays
// (async () => {
//     await mongoose.connect("mongodb://localhost:27017/PortalForStudents", {
//         useNewUrlParser: true,
//     });
//     const specialDays = await getSpecialDays();
//     console.log(specialDays);
//     await mongoose.disconnect();
// })();
