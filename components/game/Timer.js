import gameStore from "../../store/gameStore";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Timer() {
    const [time, setTime] = useState(gameStore.timeout);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(gameStore.timeout);

            if (gameStore.timeout === 0) {
                clearInterval(timerId);
                const delayId = setTimeout(() => {
                    alert("Timeout");
                    axios.get('/api/questions').then(() =>
                        document.location = "/results"
                    )
                    clearTimeout(delayId);
                }, 500)
            }
        }, 100)

        return () => clearInterval(timer);
    }, [])

    return <div className="millionaire-timer">
        <div className="millionaire-timer__text">{time}</div>
        <div className="millionaire-timer__bg"/>
    </div>
}