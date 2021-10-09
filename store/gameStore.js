import {makeAutoObservable} from "mobx";
import {DateTime} from "luxon"

class Game {
    progress = 0;
    hints = {
        double: {used: false, active: false},
        half: {used: false, active: false},
        shield: {used: false, active: false}
    }
    question = {name: "", answers: []}
    isButtonsEnabled = true;
    endTime = DateTime.now() + 30_000

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    get timeout() {
        const difference = Math.trunc((this.endTime - DateTime.now()) / 1000)
        return (difference >= 0) ? difference: 0
    }

    setHints(newHints) {
        console.log(newHints)
        this.hints = newHints;
    }

    updateQuestion(newQuestionData){
        this.hints = newQuestionData.hints;
        this.progress = newQuestionData.progress;
        this.question = newQuestionData.question;
        this.enableButtons()
    }

    disableButtons(){
        this.isButtonsEnabled = false;
    }

    enableButtons(){
        this.isButtonsEnabled = true;
    }
}

export default new Game();