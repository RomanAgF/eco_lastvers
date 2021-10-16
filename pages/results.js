import {withIronSession} from "next-iron-session";
import ensureLoggedIn from "../helpers/ensureLoggedIn";
import getConfig from "next/config";
import {useEffect, useRef} from "react";
import {findGameSession} from "../services/gameSessionService";
import Link from "next/link";

const {serverRuntimeConfig} = getConfig()

export default function Results(props) {
    const modalRef = useRef();
    const modalWindowRef = useRef();

    useEffect(() => {
        const modal = modalRef.current;
        const modalWindow = modalWindowRef.current;

        modal.classList.remove("modal-overlay_fill-bg");
        setTimeout(() => modalWindow.classList.add("modal-window_show"), 800);
    }, []);

    return <div className="modal-overlay modal-overlay_fill-bg" ref={modalRef}>
        <div className="modal-window ui" ref={modalWindowRef}>
            <h1>Well that&apos;s it, {props.progress} of 10</h1>
            <Link href="/api/auth/logout">Logout</Link><br/>
            <Link href="/waiting">Wait for the next game</Link>
        </div>
    </div>
}

export const getServerSideProps = withIronSession(
    ensureLoggedIn(async ({req}) => {
        const user = req.session.get('user');
        const gameSession = await findGameSession(user.login);

        if (!gameSession){
            return {redirect: {destination: '/waiting', permanent: false}}
        }

        if (gameSession.status === 0) {
            return {redirect: {destination: '/game', permanent: false}};
        }

        return {props: {progress: gameSession.progress}}
    }, '/'),
    serverRuntimeConfig.ironSessionConfig
)