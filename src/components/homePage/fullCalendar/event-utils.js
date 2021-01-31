let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        title: "Mentor Sesion",
        date: "2020-11-17 12:30",
        backgroundColor: "red",
    },
    {
        title: "Backend 2 Starts",
        date: "2020-11-03 10:30",
    },
    {
        title: "Frontend 1 Ends",
        date: "2020-11-15 04:30",
    },
    {
        title: "Holiday",
        date: "2020-11-11 11:30",
    },

    {
        id: createEventId(),
        title: "Timed event",
        start: todayStr + "T12:00:00",
    },
];

export function createEventId() {
    return String(eventGuid++);
}
