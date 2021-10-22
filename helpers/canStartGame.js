import getConfig from "next/config";
import {DateTime, Interval} from "luxon";

const {serverRuntimeConfig} = getConfig()


function canStartGame() {
    if (serverRuntimeConfig.DISABLE_WAITING_ROOM){
        return true;
    }

    const startTime = DateTime.fromObject(serverRuntimeConfig.GAME_START_TIME, {zone: "Europe/Moscow"});
    const endTime = startTime.plus({seconds: 5});

    const interval = Interval.fromDateTimes(startTime, endTime);

    const timeNow = DateTime.utc().setZone("Europe/Moscow");
    return interval.contains(timeNow);
}

export default canStartGame;