import gameStore from "../../../store/gameStore";


export default function Half() {
    const hintIsEnable = !gameStore.hints.half.used;
    const disabled = "millionaire-hints__hint_disabled";

    const className = "millionaire-hints__item millionaire-hints__hint millionaire-hints__hint-half "

    return (
        <div
            className={className + (hintIsEnable ? "" : disabled)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="50Х50"
        >
            <i className="fas fa-balance-scale"/>
        </div>
    )
}