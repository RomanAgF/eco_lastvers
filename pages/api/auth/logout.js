import {withIronSession} from "next-iron-session";
import getConfig from "next/config";

const {serverRuntimeConfig} = getConfig()

function handler(req, res) {
    req.session.destroy();

    if (req.method === "GET") {
        return res.redirect('/');
    }

    res.send("Logged out");
}

export default withIronSession(handler, serverRuntimeConfig.ironSessionConfig);