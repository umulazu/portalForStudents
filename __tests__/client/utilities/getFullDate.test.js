import getFullDate from "../../../client/utilities/getFullDate";
import daysOfWeek from "../../../constants/daysOfWeek";
import months from "../../../client/constants/months";

describe("getFullDate utility", () => {
    it('should return {17 Декабря 1995, Воскресенье} when gets "new Date(December 17, 1995 03:24:00)"', () => {
        const date = new Date("December 17, 1995 03:24:00");
        const month = months[date.getMonth() + 1].nameAfterDate;
        console.log(getFullDate(date));
        expect(getFullDate(date)).toEqual({
            date: date.getDate() + " " + month + " " + date.getFullYear(),
            dayOfWeek: daysOfWeek[date.getDay()],
        });
    });

    it('should return {1 Января 1970, Четверг} when gets "new Date(null)"', () => {
        const date = new Date(null);
        const month = months[date.getMonth() + 1].nameAfterDate;
        console.log(getFullDate(date));
        expect(getFullDate(date)).toEqual({
            date: date.getDate() + " " + month + " " + date.getFullYear(),
            dayOfWeek: daysOfWeek[date.getDay()],
        });
    });
});