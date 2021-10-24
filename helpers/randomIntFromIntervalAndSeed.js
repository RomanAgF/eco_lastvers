import random from "seedrandom";

export default function randomIntFromIntervalAndSeed(min, max, seed) {
  return Math.floor(random(seed).quick() * (max - min + 1) + min);
}
