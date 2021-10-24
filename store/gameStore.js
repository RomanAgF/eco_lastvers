import { makeAutoObservable } from "mobx";
import { DateTime, Interval } from "luxon";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

class Game {
  progress = 0;

  question = { name: "", answers: [] };

  isButtonsEnabled = true;

  endTime = DateTime.utc().plus({ seconds: publicRuntimeConfig.TIMER_DELAY });

  serverTime = DateTime.utc();

  constructor() {
    makeAutoObservable(this);
  }

  calculateDifference() {
    const positive = Interval.fromDateTimes(
      DateTime.utc(),
      this.serverTime
    ).length("milliseconds");
    const negative = -Interval.fromDateTimes(
      this.serverTime,
      DateTime.utc()
    ).length("milliseconds");
    this.difference = positive || negative;
  }

  get timeout() {
    const timeNow = DateTime.utc().plus({ milliseconds: this.difference });
    return (
      Math.trunc(
        Interval.fromDateTimes(timeNow, this.endTime).length("seconds")
      ) || 0
    );
  }

  updateQuestion(newQuestionData) {
    this.progress = newQuestionData.progress;
    this.question = newQuestionData.question;
    this.endTime = DateTime.fromISO(newQuestionData.endTime);
    this.serverTime = DateTime.fromISO(newQuestionData.serverTime);
    this.calculateDifference();
    this.enableButtons();
  }

  disableButtons() {
    this.isButtonsEnabled = false;
  }

  enableButtons() {
    this.isButtonsEnabled = true;
  }
}

export default new Game();
