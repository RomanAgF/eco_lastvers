import { withIronSession } from "next-iron-session";
import getConfig from "next/config";
import { DateTime } from "luxon";
import Welcome from "../components/welcome/Welcome";
import ensureLoggedOut from "../helpers/ensureLoggedOut";
import SignUpForm from "../components/forms/SignUpForm";
import canSignInOrSignUp from "../helpers/canSignInOrSignUp";
import ClosedRegistration from "../components/ClosedRegistration";

const { serverRuntimeConfig } = getConfig();

export default function SignUp({ registrationIsOpen, startTime }) {
  if (!registrationIsOpen) {
    return <ClosedRegistration startTime={startTime} />;
  }

  return (
    <Welcome>
      <SignUpForm />
    </Welcome>
  );
}

export const getServerSideProps = withIronSession(
  ensureLoggedOut(() => {
    const startTime = DateTime.fromObject(serverRuntimeConfig.GAME_START_TIME, {
      zone: "Europe/Moscow",
    })
      .minus({ hours: 1 })
      .toISO();
    return { props: { registrationIsOpen: canSignInOrSignUp(), startTime } };
  }, "/game"),
  serverRuntimeConfig.ironSessionConfig
);
