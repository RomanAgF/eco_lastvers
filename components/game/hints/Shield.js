import gameStore from "../../../store/gameStore";
import axios from "../../../helpers/frontendAxios";
import {observer} from "mobx-react-lite";


function Shield() {
    function useHint() {
        axios
            .post('/api/hints/use', {hint: 'shield'})
            .then(response => gameStore.setHints(response.data))
    }

    const hintIsEnabled = !gameStore.hints.shield.used;

    const disabled = "millionaire-hints__hint_disabled";
    const className = "millionaire-hints__item millionaire-hints__hint millionaire-hints__hint-protect "

    return (
        <div
            className={className + (hintIsEnabled ? "" : disabled)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Double your chance"
            onClick={useHint}
        >
            <i className="fas fa-shield-alt"/>
        </div>
    )
}

export default observer(Shield);