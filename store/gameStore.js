import { makeAutoObservable } from "mobx";
import { DateTime, Interval } from "luxon";
import getConfig from "next/config";
import axios from "../helpers/frontendAxios";
import getDifferenceBetweenDates from "../helpers/getDifferenceBetweenDates";

const { publicRuntimeConfig } = getConfig();


class Game {
  progress = 0;

  question = { name: "", answers: [] };

  isButtonsEnabled = true;

  endTime = DateTime.utc().plus({ seconds: publicRuntimeConfig.TIME_TO_ANSWER });

  serverTime = DateTime.utc();

  timeout = publicRuntimeConfig.TIME_TO_ANSWER;

  constructor() {
    makeAutoObservable(this);
  }

  updateQuestion(newQuestionData) {
    this.progress = newQuestionData.progress;
    this.question = newQuestionData.question;
    this.endTime = DateTime.fromISO(newQuestionData.endTime);
    this.serverTime = DateTime.fromISO(newQuestionData.serverTime);
    this.difference = getDifferenceBetweenDates(DateTime.utc(), this.serverTime);
    this.enableButtons();
    this.startTimer();
  }

  disableButtons() {
    this.isButtonsEnabled = false;
  }

  setAnswerState(answerId, state) {
    this.question.answers[answerId].state = state;
  }

  enableButtons() {
    this.isButtonsEnabled = true;
  }

  stopTimer() {
    clearInterval(this.timerId);
  }

  clearTimer() {
    this.timeout = 0;
  }

  updateTimer() {
    const timeNow = DateTime.utc().plus({ milliseconds: this.difference });
    this.timeout = Math.trunc(Interval.fromDateTimes(timeNow, this.endTime).length("seconds")) || 0;

    if (this.timeout === 0) {
      this.stopTimer();

      axios.get('/api/questions/checkAnswer').then(response => {
        if (!response.data) return;

        const {correct, incorrect} = response.data;

        if (incorrect) {
          this.setAnswerState(incorrect, "incorrect");

          const sound = new Audio("/sounds/wrong_ans.mp3");
          sound.volume = 0.2;
          sound.play();
        } else {
          const sound = new Audio("/sounds/true answer.mp3");
          sound.volume = 0.2;
          sound.play();
        }

        this.setAnswerState(correct, "correct");
      });

      setTimeout(()=> {
        axios.get("/api/questions").then(questionResponse => {
          if (questionResponse.data) {
            this.updateQuestion(questionResponse.data);
          }
        })
      }, 2000)
    }
  }

  startTimer() {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => this.updateTimer(), 100);
  }
}

export default new Game();
