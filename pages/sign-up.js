import { withIronSession } from "next-iron-session";
import getConfig from "next/config";
import Welcome from "../components/welcome/Welcome";
import ensureLoggedOut from "../helpers/ensureLoggedOut";
import SignUpForm from "../components/forms/SignUpForm";
import canSignInOrSignUp from "../helpers/canSignInOrSignUp";
import ClosedRegistration from "../components/ClosedRegistration";
import getStartDateTime from "../helpers/getStartDateTime";

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
    const startTime = getStartDateTime().minus({ hours: 1 }).toUTC().toISO();
    return { props: { registrationIsOpen: canSignInOrSignUp(), startTime } };
  }, "/game"),
  serverRuntimeConfig.ironSessionConfig
);
