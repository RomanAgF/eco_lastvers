import gameStore from "../../store/gameStore";
import {useEffect, useState} from "react"

export default function Timer() {
    const [time, setTime] = useState(gameStore.timeout)
    useEffect(() => {
        setInterval(() => setTime(gameStore.timeout), 100)
    }, [gameStore.timeout])

    return <div className="millionaire-timer">
        <div className="millionaire-timer__text">{time}</div>
        <div className="millionaire-timer__bg"/>
    </div>
}