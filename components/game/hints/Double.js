import gameStore from "../../../store/gameStore";
import axios from "../../../helpers/frontendAxios";
import {observer} from "mobx-react-lite";


function Double() {
    function useHint() {
        axios
            .post('/api/hints/use', {hint: 'double'})
            .then(response => gameStore.setHints(response.data))
    }

    const hintIsEnabled = !gameStore.hints.double.used;

    const disabled = "millionaire-hints__hint_disabled";
    const className = "millionaire-hints__item millionaire-hints__hint millionaire-hints__hint-double ";

    return (
        <div
            className={className + (hintIsEnabled ? "" : disabled)}
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