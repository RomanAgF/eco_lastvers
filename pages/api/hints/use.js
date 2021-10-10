import {withIronSession} from "next-iron-session";
import getConfig from "next/config";
import isGameStarted from "../../../helpers/isGameStarted";
import {findGameSession, activateHint} from "../../../services/gameSessionService";
import unzipHint from "../../../helpers/unzipHint";

const {serverRuntimeConfig} = getConfig()

const gameStatuses = {
    GAMESTARTED: 0,
    WON: 1,
    LOOSE: 2
}

async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send();
        return;
    }

    if (!["double", "shield", "half"].includes(req.body?.hint)) {
        res.status(400).json({message: "Hint is missing or incorrect"});
    }

    const user = req.session.get('user');
    if (!user) {
        res.status(401).send();
        return;
    }

    const gameSession = await findGameSession(user.login);

    if (!isGameStarted()){
        res.status(200).json({message: "GAME_NOT_STARTED"});
        return;
    }

    if ((gameSession.status !== gameStatuses.GAMESTARTED)) {
        res.status(200).json({message: "GAME_OVER"});
        return;
    }

    // if hint was used then just return
    if (gameSession[req.body.hint] !== 0) {
        const {double, shield, half} = gameSession;
        res.status(200).json({
            double: unzipHint(double),
            shield: unzipHint(shield),
            half: unzipHint(half)
        });
        return;
    }

    await activateHint(user.login, req.body.hint);
    const {double, shield, half} = await findGameSession(user.login);
    res.status(200).json({
        double: unzipHint(double),
        shield: unzipHint(shield),
        half: unzipHint(half)
    });
}


export default withIronSession(handler, serverRuntimeConfig.ironSessionConfig);