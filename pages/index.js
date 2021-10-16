import SignInForm from "../components/forms/SignInForm";
import Welcome from "../components/welcome/Welcome";
import {withIronSession} from "next-iron-session";
import getConfig from 'next/config';
import ensureLoggedOut from "../helpers/ensureLoggedOut";
import {DateTime, Interval} from "luxon";
import canSignInOrSignUp from "../helpers/canSignInOrSignUp";
import ClosedRegistration from "../components/ClosedRegistration";

const {serverRuntimeConfig} = getConfig()

export default function Home({registrationIsOpen, startTime}) {
    if (!registrationIsOpen) {
        return <ClosedRegistration startTime={startTime}/>
    }
    return (
        <Welcome>
            <SignInForm/>
        </Welcome>
    )
}


export const getServerSideProps = withIronSession(
    ensureLoggedOut(() => {
        const startTime = DateTime
            .fromObject(serverRuntimeConfig.GAME_START_TIME, {zone: "Europe/Moscow"})
            .minus({hours: 1})
            .toISO();
        return {props: {registrationIsOpen: canSignInOrSignUp(), startTime}}
    }, '/game'),
    serverRuntimeConfig.ironSessionConfig
)