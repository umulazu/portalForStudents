import fs from "fs";

export const parseHolidaysCalendar = path => {
    try {
        const data = fs.readFileSync(path, "utf8");
        const pattern = /UID:(\d{4}-\d{2}-\d{2})RU\d+(reg|bridge)country/g;

        let holidays = [];
        let matched;
        while ((matched = pattern.exec(data)) !== null) {
            holidays.push(matched[1]);
        }
        return holidays;
        // console.log(holidays);
    } catch (err) {
        console.error(err);
    }
};
