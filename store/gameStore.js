import {makeAutoObservable} from "mobx";
import {DateTime, Interval} from "luxon"

class Game {
    progress = 0;
    question = {name: "", answers: []};
    isButtonsEnabled = true;
    endTime = DateTime.utc().plus({seconds: 30});

    constructor() {
        makeAutoObservable(this);
    }

    get timeout() {
        const timeNow = DateTime.utc();
        return Math.trunc(Interval.fromDateTimes(timeNow, this.endTime).length("seconds")) || 0;
    }

    updateQuestion(newQuestionData) {
        this.progress = newQuestionData.progress;
        this.question = newQuestionData.question;
        this.endTime = DateTime.fromISO(newQuestionData.endTime);
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