import { HolidaySchema, PostponedDaySchema } from "../schemas";
import mongoose from "mongoose";

const Holiday = mongoose.model("Holiday", HolidaySchema, "holidays");
const PostponedDay = mongoose.model(
    "PostponedDay",
    PostponedDaySchema,
    "postponedDays"
);

export const addHolidays = async list => {
    let holidays = [];
    for (const day of list) {
        if (!(await Holiday.exists({ _id: day }))) {
            holidays.push({ _id: day });
        }
    }
    await Holiday.insertMany(holidays);
};

export const addPostponedDays = async list => {
    let postponedDays = [];
    for (const day of list) {
        if (!(await PostponedDay.exists({ _id: day }))) {
            postponedDays.push({ _id: day });
        }
    }
    await PostponedDay.insertMany(postponedDays);
};

// todo: may be there is need in sending time interval
export const getSpecialDays = async () => {
    const postponedDays = await PostponedDay.find({}, "_id").lean();
    const holidays = await Holiday.find({}, "_id").lean();
    return {
        holidays: holidays.map(day => day._id),
        postponedDays: postponedDays.map(day => day._id),
    };
};
