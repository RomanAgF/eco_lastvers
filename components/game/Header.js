import getConfig from "next/config";
import Timer from "./Timer";
import gameStore from "../../store/gameStore";

const { publicRuntimeConfig } = getConfig();

export default function Header() {
  return (
    <div className="millionaire-top ui">
      <Timer />
      <div className="millionaire-hints__item millionaire-end-game">
        <h3>
          {gameStore.progress + 1}/{publicRuntimeConfig.QUESTIONS_QUANTITY}
        </h3>
      </div>
    </div>
  );
}
