import {withIronSession} from "next-iron-session";
import ensureLoggedIn from "../helpers/ensureLoggedIn";
import getConfig from "next/config";
import {useEffect, useRef} from "react";
import canStartGame from "../helpers/canStartGame";
import {DateTime, Interval} from "luxon";
import Link from "next/link";

const {serverRuntimeConfig} = getConfig()

export default function Waiting(props) {
    const modalRef = useRef();
    const modalWindowRef = useRef();

    const startDate = DateTime.fromISO(props.startTime, {locale: "en"});
    const {weekday, weekdayLong} = startDate;

    const isToday = DateTime.local({locale: "en"}).weekday === weekday;

    const day = isToday ? "today" : `in the next ${weekdayLong}`;
    const time = startDate.toFormat("hh:mm a");

    // it's true if the game is today, but the current time is greater than the start time
    const gameover = !Interval.fromDateTimes(DateTime.local(), startDate).length("seconds") && isToday;

    let message;
    if (gameover) {
        message = "The next game will be next week"
    } else {
        message = `The game will be started ${day} \n at ${time} in your time zone`;
    }

    useEffect(() => {
        const modal = modalRef.current;
        const modalWindow = modalWindowRef.current;
        modal.classList.remove("modal-overlay_fill-bg");
        setTimeout(() => modalWindow.classList.add("modal-window_show"), 800);

        const timeNow = DateTime.local();
        const timeout = Interval.fromDateTimes(timeNow, startDate).length("milliseconds") + 1100;

        if (timeout) {
            setTimeout(() => document.location = '/game', timeout);
        }
    }, [])

    return <div className="modal-overlay modal-overlay_fill-bg" ref={modalRef}>
        <div className="modal-window ui" ref={modalWindowRef}>
            <h1>{message}</h1>
            {(isToday && !gameover) && <p>When the game is start, you will be redirected</p>}
            <Link href="/api/auth/logout">Logout</Link>
        </div>
    </div>
}

export const getServerSideProps = withIronSession(
    ensureLoggedIn(() => {
        if (canStartGame()) {
            return {redirect: {destination: '/game', permanent: false}};
        }

        const {hour, minute, weekday} = serverRuntimeConfig.GAME_START_TIME;

        const startTime = DateTime.fromObject({hour, minute, weekday}, {zone: "Europe/Moscow"}).toISO();

        return {props: {startTime}};
    }, '/'),
    serverRuntimeConfig.ironSessionConfig
)