import SignInForm from "../components/forms/SignInForm";
import Welcome from "../components/welcome/Welcome";
import {withIronSession} from "next-iron-session";
import getConfig from 'next/config';
import ensureLoggedOut from "../helpers/ensureLoggedOut";

const {serverRuntimeConfig} = getConfig()

export default function Home() {
    return (
        <Welcome>
            <SignInForm/>
        </Welcome>
    )
}


export const getServerSideProps = withIronSession(
    ensureLoggedOut(() => {
        return {props: {},}
    }, '/game'),
    serverRuntimeConfig.ironSessionConfig
)