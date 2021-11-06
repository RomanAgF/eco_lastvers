import {Interval} from "luxon";

export default function calculateDifference(firstDate, secondDate) {
  const positive = Interval.fromDateTimes(firstDate, secondDate).length("milliseconds");
  const negative = -Interval.fromDateTimes(secondDate, firstDate).length("milliseconds");
  return  positive || negative;
}