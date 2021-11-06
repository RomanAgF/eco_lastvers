import axios from "../../helpers/frontendAxios";
import gameStore from "../../store/gameStore";

const STYLES = {
  default: ["millionaire-ui-answers__item", "ui"],
  picked: [
    "millionaire-ui-answers__item",
    "ui",
    "millionaire-ui-answers__item_picked",
  ],
  correct: [
    "millionaire-ui-answers__item",
    "ui",
    "millionaire-ui-answers__item_accept",
  ],
  incorrect: [
    "millionaire-ui-answers__item",
    "ui",
    "millionaire-ui-answers__item_fail",
  ]
};


function Answer(props) {
  const styles = STYLES[props.state || "default"];

  async function submit() {
    if (!gameStore.isButtonsEnabled) return;
    gameStore.disableButtons();
    gameStore.setAnswerState(props.id, "picked");
    await axios.post("/api/questions/answer", {id: props.id});
  }

  return (
    <div className={styles.join(" ")} onClick={submit}>
      {props.text}
    </div>
  );
}

export default Answer;
