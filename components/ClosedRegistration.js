import { DateTime, Interval } from "luxon";
import Welcome from "./welcome/Welcome";

export default function ClosedRegistration({ startTime }) {
  const startDate = DateTime.fromISO(startTime, { locale: "en" });
  const { weekday, weekdayLong } = startDate;

  const isToday = DateTime.local({ locale: "en" }).weekday === weekday;

  const day = isToday ? "today" : `in the next ${weekdayLong}`;
  const time = startDate.toFormat("hh:mm a");

  // it's true if the game is today, but the current time is greater than the start time
  const gameover =
    !Interval.fromDateTimes(DateTime.local(), startDate).length("seconds") &&
    isToday;

  let message;
  if (gameover) {
    message = "The next game will be next week";
  } else {
    message = `The registration will started ${day} \n at ${time} in your time zone`;
  }

  return (
    <Welcome>
      <br />
      <h2>Registration is closed</h2>
      <p>{message}</p>
    </Welcome>
  );
}
