import gameStore from "../../store/gameStore";
import {useEffect, useState} from "react";

export default function Timer() {
    const [time, setTime] = useState(gameStore.timeout);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(gameStore.timeout);

            if (gameStore.timeout === 0) {
                clearTimeout(timer);
                alert("Timeout");
                document.location = "/results";
            }
        }, 100)

        return () => clearTimeout(timer);
    }, [])

    return <div className="millionaire-timer">
        <div className="millionaire-timer__text">{time}</div>
        <div className="millionaire-timer__bg"/>
    </div>
}