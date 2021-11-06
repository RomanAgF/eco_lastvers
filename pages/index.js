import { withIronSession } from "next-iron-session";
import getConfig from "next/config";
import SignInForm from "../components/forms/SignInForm";
import Welcome from "../components/welcome/Welcome";
import ensureLoggedOut from "../helpers/ensureLoggedOut";
import canSignInOrSignUp from "../helpers/canSignInOrSignUp";
import ClosedRegistration from "../components/ClosedRegistration";
import getStartDateTime from "../helpers/getStartDateTime";

const { serverRuntimeConfig } = getConfig();

export default function Home({ registrationIsOpen, startTime }) {
  if (!registrationIsOpen) {
    return <ClosedRegistration startTime={startTime} />;
  }

  return (
    <Welcome>
      <SignInForm />
    </Welcome>
  );
}

export const getServerSideProps = withIronSession(
  ensureLoggedOut(() => {
    const startTime = getStartDateTime().minus({ hours: 24 }).toUTC().toISO();
    return { props: { registrationIsOpen: canSignInOrSignUp(), startTime } };
  }, "/game"),
  serverRuntimeConfig.ironSessionConfig
);
