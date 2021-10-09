import gameStore from "../../../store/gameStore";


export default function Shield() {
    const hintIsEnable = !gameStore.hints.shield.used;
    const disabled = "millionaire-hints__hint_disabled";

    const className = "millionaire-hints__item millionaire-hints__hint millionaire-hints__hint-protect "

    return (
        <div
            className={className + (hintIsEnable ? "" : disabled)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Double your chance"
        >
            <i className="fas fa-shield-alt"/>
        </div>
    )
}