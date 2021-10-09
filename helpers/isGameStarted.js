import getConfig from "next/config";

const {serverRuntimeConfig} = getConfig()

function isGameStarted() {
    const startTime = serverRuntimeConfig.GAME_START_TIME;

    const timeNow = new Date();
    const hours = timeNow.getHours();
    const minutes = timeNow.getMinutes();

    return (
        // Time is greater than startTime
        ((hours === startTime.hours) && (minutes >= startTime.minutes)) || (hours >= startTime.hours)
    )
}

export default isGameStarted;