import {DateTime} from "luxon";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();


export default function getStartDateTime(){
  const startDate = DateTime.fromObject(serverRuntimeConfig.GAME_START_TIME, {zone: "Europe/Moscow"});
  const dateNow = DateTime.utc().setZone("Europe/Moscow");

  // if this date has already passed, then it should be next week
  if (startDate.startOf("day") < dateNow.startOf("day")){
    return startDate.plus({week: 1});
  }

  return startDate;
}