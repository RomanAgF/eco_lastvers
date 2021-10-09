import Timer from "./Timer";
import Half from "./hints/Half";
import Double from "./hints/Double";
import Shield from "./hints/Shield";
import gameStore from "../../store/gameStore";

export default function Header() {
    return <div className="millionaire-top ui">
        <div className="millionaire-hints">
            <Half/>
            <Double/>
            <Shield/>
        </div>
        <Timer/>

        <div className="millionaire-hints__item millionaire-end-game">
            <h3>{gameStore.progress + 1}/10</h3>
        </div>
    </div>
}