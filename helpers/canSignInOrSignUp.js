import getConfig from "next/config";
import { DateTime, Interval } from "luxon";
import getStartDateTime from "../helpers/getStartDateTime";

const { serverRuntimeConfig } = getConfig();

export default function canSignInOrSignUp() {
  if (serverRuntimeConfig.REGISTRATION_IS_ALWAYS_OPEN) {
    return true;
  }

  const startTime = getStartDateTime()

  const interval = Interval.fromDateTimes(
    startTime.minus({ hours: 24 }),
    startTime
  );

  const timeNow = DateTime.utc().setZone("Europe/Moscow");
  return interval.contains(timeNow);
}
