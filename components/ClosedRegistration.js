import { DateTime, Interval } from "luxon";
import Welcome from "./welcome/Welcome";

export default function ClosedRegistration({ startTime }) {
  const startDate = DateTime.fromISO(startTime, { locale: "en"});
  const dateNow = DateTime.utc();

  const isToday = dateNow.day === startDate.day;

  // it's true if the game is today, but the current time is greater than the start time
  const gameOver = !Interval.fromDateTimes(dateNow, startDate).length("seconds") && isToday;

  let message;
  if (gameOver) {
    message = "The next game will be next week";
  } else {
    const day = isToday ? "today" : `in the next ${startDate.toLocal().weekdayLong}`;
    const time = startDate.toLocal().toFormat("hh:mm a");
    message = `The registration will started ${day} \n at ${time} in your time zone`;
  }

  return (
    <Welcome>
      <br/>
      <h2>Registration is closed</h2>
      <p>{message}</p>
    </Welcome>
  );
}
