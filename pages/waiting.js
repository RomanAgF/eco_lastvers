import {withIronSession} from "next-iron-session";
import ensureLoggedIn from "../helpers/ensureLoggedIn";
import getConfig from "next/config";
import {useEffect, useRef} from "react";
import isGameStarted from "../helpers/isGameStarted";
import {DateTime} from "luxon";

const {serverRuntimeConfig} = getConfig()

export default function Waiting(props) {
    const modalRef = useRef();
    const modalWindowRef = useRef();

    const date = DateTime.fromISO(props.startTime, {locale: "en"});
    const {weekday, weekdayLong} = date;

    const isToday = DateTime.local({locale: "en"}).weekday === weekday;

    const day = isToday ? "today" : `in the next ${weekdayLong}`;
    const time = date.toFormat("hh:mm a");

    useEffect(() => {
        const modal = modalRef.current;
        const modalWindow = modalWindowRef.current;

        modal.classList.remove("modal-overlay_fill-bg");
        setTimeout(() => modalWindow.classList.add("modal-window_show"), 800);
    }, [])

    return <div className="modal-overlay modal-overlay_fill-bg" ref={modalRef}>
        <div className="modal-window ui" ref={modalWindowRef}>
            <h1>The game will be start {day} <br/> at {time} in your time zone</h1>
        </div>
    </div>
}

export const getServerSideProps = withIronSession(
    ensureLoggedIn(() => {
        if (isGameStarted()) {
            return {redirect: {destination: '/game', permanent: false}};
        }

        const {hour, minute, weekday} = serverRuntimeConfig.GAME_START_TIME;

        const startTime = DateTime.fromObject({hour, minute, weekday}, {zone: "Europe/Moscow"}).toISO();

        return {props: {startTime}};
    }, '/'),
    serverRuntimeConfig.ironSessionConfig
)