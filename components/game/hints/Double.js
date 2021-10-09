import gameStore from "../../../store/gameStore";
import axios from "axios";
import {observer} from "mobx-react-lite";

const STYLES = {
    default: ["millionaire-hints__item", "millionaire-hints__hint", "millionaire-hints__hint-double"],
    disabled: ["millionaire-hints__item", "millionaire-hints__hint", "millionaire-hints__hint-double", "millionaire-hints__hint_disabled"]
}

function Double() {
    function useHint() {
        axios
            .post('/api/hints/use', {hint: 'double'})
            .then(response => gameStore.setHints(response.data))
    }

    const isHintEnable = !gameStore.hints.double.used;

    return (
        <div
            className={isHintEnable ? STYLES.default.join(' ') : STYLES.disabled.join(' ')}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Second chance"
            onClick={useHint}
        >
            <i className="fas fa-check-double"/>
        </div>
    )
}

export default observer(Double);