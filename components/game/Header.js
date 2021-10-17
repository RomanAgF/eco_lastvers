import Timer from "./Timer";
import gameStore from "../../store/gameStore";

export default function Header() {
    return <div className="millionaire-top ui">
        <Timer/>
        <div className="millionaire-hints__item millionaire-end-game">
            <h3>{gameStore.progress + 1}/10</h3>
        </div>
    </div>
}