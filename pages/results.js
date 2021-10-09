import {withIronSession} from "next-iron-session";
import ensureLoggedIn from "../helpers/ensureLoggedIn";
import getConfig from "next/config";
import {useEffect, useRef} from "react";
import {findGameSession} from "../services/gameSessionService";

const {serverRuntimeConfig} = getConfig()

export default function Results(props) {
    const modalRef = useRef();
    const modalWindowRef = useRef();

    useEffect(() => {
        const modal = modalRef.current;
        const modalWindow = modalWindowRef.current;

        modal.classList.remove("modal-overlay_fill-bg");
        setTimeout(() => modalWindow.classList.add("modal-window_show"), 800);
    }, [])

    return <div className="modal-overlay modal-overlay_fill-bg" ref={modalRef}>
        <div className="modal-window modal-window-welcome ui" ref={modalWindowRef}>
            <h1>Ну всё, {props.progress} из 10</h1>
        </div>
    </div>
}

export const getServerSideProps = withIronSession(
    ensureLoggedIn(async ({req}) => {
        const user = req.session.get('user');
        const gameSession = await findGameSession(user.login);

        if (gameSession.status === 0) {
            return {redirect: {destination: '/game', permanent: false}};
        }

        return {props: {progress: gameSession.progress},}
    }, '/'),
    serverRuntimeConfig.ironSessionConfig
)