import moment from "moment";

const getLastStartDiffNow = (lastStartTimestamp) => (
    moment.duration(moment().format("H:mm")).asMinutes() -
    moment.duration(lastStartTimestamp).asMinutes()
);

// const getLastStartDiffNow = (lastStartTimestamp) => {
// console.log("now = " + moment.duration(moment().format("H:mm")).asMinutes());
// console.log("lastStart = " + moment.duration(lastStartTimestamp).asMinutes());
//     return (
//         moment.duration(moment().format("H:mm")).asMinutes() -
//         moment.duration(lastStartTimestamp).asMinutes()
//     )
// };

export default getLastStartDiffNow;