import getConfig from "next/config";
import {DateTime, Interval} from "luxon";

const {serverRuntimeConfig} = getConfig()


function canStartGame() {
    const startTime = DateTime.fromObject(serverRuntimeConfig.GAME_START_TIME, {zone: "Europe/Moscow"});
    const endTime = startTime.plus({seconds: 5});

    const interval = Interval.fromDateTimes(startTime, endTime);

    const timeNow = DateTime.local().setZone("Europe/Moscow");
    return interval.contains(timeNow);
}

export default canStartGame;