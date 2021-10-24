import getConfig from "next/config";
import { DateTime, Interval } from "luxon";

const { serverRuntimeConfig } = getConfig();

export default function canSignInOrSignUp() {
  if (serverRuntimeConfig.REGISTRATION_IS_ALWAYS_OPEN) {
    return true;
  }

  const startTime = DateTime.fromObject(serverRuntimeConfig.GAME_START_TIME, {
    zone: "Europe/Moscow",
  });

  const interval = Interval.fromDateTimes(
    startTime.minus({ hours: 24 }),
    startTime
  );

  const timeNow = DateTime.utc().setZone("Europe/Moscow");
  return interval.contains(timeNow);
}
