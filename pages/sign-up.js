import Welcome from "../components/welcome/Welcome";
import {withIronSession} from "next-iron-session";
import getConfig from 'next/config';
import ensureLoggedOut from "../helpers/ensureLoggedOut";
import SignUpForm from "../components/forms/SignUpForm";

const {serverRuntimeConfig} = getConfig()

export default function SignUp() {
    return (
        <Welcome>
            <SignUpForm/>
        </Welcome>
    )
}

export const getServerSideProps = withIronSession(
    ensureLoggedOut(() => {
        return {props: {},}
    }, '/game'),
    serverRuntimeConfig.ironSessionConfig
)