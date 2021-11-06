import gameStore from "../../store/gameStore";
import {observer} from "mobx-react-lite";

function Timer() {
  return (
    <div className="millionaire-timer">
      <div className="millionaire-timer__text">{gameStore.timeout}</div>
      <div className="millionaire-timer__bg" />
    </div>
  );
}

export default observer(Timer);
