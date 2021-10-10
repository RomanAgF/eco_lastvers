import getConfig from "next/config";
import {DateTime} from "luxon";

const {serverRuntimeConfig} = getConfig()

function isGameStarted() {
    const startTime = serverRuntimeConfig.GAME_START_TIME;

    const timeNow = DateTime.local().setZone("Europe/Moscow");
    const {hour, minute, weekday} = timeNow;

    return (
        // Time is longer than startTime and has the same day of the week
        (((hour === startTime.hour) && (minute >= startTime.minute)) || (hour > startTime.hour)) &&
        (weekday === startTime.weekday)
    )
}

export default isGameStarted;