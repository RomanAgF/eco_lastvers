import {withIronSession} from "next-iron-session";
import getConfig from "next/config";

const {serverRuntimeConfig} = getConfig();

export default function ironSessionMiddleware(req, res, next) {
  withIronSession(() => next(), serverRuntimeConfig.ironSessionConfig)(req, res);
}
