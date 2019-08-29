import moment from "moment";

export const getLastStartDiffNow = (lastStartTimestamp) => (
    moment.duration(moment().format("H:mm")).asMinutes() -
    moment.duration(lastStartTimestamp).asMinutes()
);

export default getLastStartDiffNow;