import getConfig from "next/config";
import { DateTime, Interval } from "luxon";

import getStartDateTime from "../helpers/getStartDateTime";
const { serverRuntimeConfig } = getConfig();

function canStartGame() {
  if (serverRuntimeConfig.DISABLE_WAITING_ROOM) {
    return true;
  }
  const timeNow = DateTime.utc().setZone("Europe/Moscow");

  const startTime = getStartDateTime();
  const endTime = startTime.plus({ seconds: 2 });

  const interval = Interval.fromDateTimes(startTime, endTime);
  return interval.contains(timeNow);
}

export default canStartGame;
