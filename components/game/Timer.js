import { useEffect, useState } from "react";
import axios from "axios";
import gameStore from "../../store/gameStore";

function Timer() {
  const [time, setTime] = useState(gameStore.timeout);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(gameStore.timeout);

      if (gameStore.timeout === 0) {
        clearInterval(timerId);
        setTimeout(() => {
          alert("Timeout");
          axios
            .get("/api/questions")
            .then(() => (document.location = "/results"));
        }, 500);
      }
    }, 100);

    return () => clearInterval(timerId);
  });

  return (
    <div className="millionaire-timer">
      <div className="millionaire-timer__text">{time}</div>
      <div className="millionaire-timer__bg" />
    </div>
  );
}

export default Timer;
