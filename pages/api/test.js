import {DateTime} from "luxon";

export default function handler(req, res) {
    const now = {
        timeNow: DateTime.now().toISO(),
        utcTime: DateTime.utc().toISO(),
        localTime: DateTime.local().toISO()
    }

    const plus30 = {
        timeNow: DateTime.now().plus({seconds: 30}).toISO(),
        utcTime: DateTime.utc().plus({seconds: 30}).toISO(),
        localTime: DateTime.local().plus({seconds: 30}).toISO()
    }

    res.json({now, plus30})
}