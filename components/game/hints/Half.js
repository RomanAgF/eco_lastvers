import gameStore from "../../../store/gameStore";
import axios from "../../../helpers/frontendAxios";
import {observer} from "mobx-react-lite";


function Half() {
    function useHint() {
        axios.post('/api/hints/use', {hint: 'half'}).then(() => {
            axios.get('/api/questions').then(questionResponse => {
                if (questionResponse.data) {
                    gameStore.updateQuestion(questionResponse.data)
                }
            })
        });
    }

    const hintIsEnabled = !gameStore.hints.half.used;

    const disabled = "millionaire-hints__hint_disabled";
    const className = "millionaire-hints__item millionaire-hints__hint millionaire-hints__hint-half "

    return (
        <div
            className={className + (hintIsEnabled ? "" : disabled)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="50Х50"
            onClick={useHint}
        >
            <i className="fas fa-balance-scale"/>
        </div>
    )
}

export default observer(Half);