import {withIronSession} from "next-iron-session";
import getConfig from "next/config";
import questions from "../../../questionsData";
import isGameStarted from "../../../helpers/isGameStarted";
import {
    incrementProgress,
    findGameSession,
    setGameSessionStatus,
    deactivateHint
} from "../../../services/gameSessionService";

const {serverRuntimeConfig} = getConfig()

const gameStatuses = {
    GAMESTARTED: 0,
    WON: 1,
    LOOSE: 2
}

async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405);
        return;
    }

    const user = req.session.get('user');
    if (!user) {
        res.status(401).send();
        return;
    }

    const gameSession = await findGameSession(user.login);

    if (!isGameStarted()) {
        res.status(200).json({message: "GAME_NOT_STARTED"});
        return;
    }

    if ((gameSession.status !== gameStatuses.GAMESTARTED)) {
        res.status(200).json({message: "GAME_OVER"});
        return;
    }

    if (questions.length <= gameSession.progress) {
        await setGameSessionStatus(user.login, gameStatuses.WON);
    }

    const shieldActivated = gameSession.shield === 3;
    const doubleActivated = gameSession.double === 3;
    const halfActivated = gameSession.half === 3;

    // deactivate hints
    if (shieldActivated) {
        await deactivateHint(user.login, "shield");
    } else if (doubleActivated) {
        await deactivateHint(user.login, "double");
    } else if (halfActivated) {
        await deactivateHint(user.login, "half");
    }

    const question = questions[gameSession.progress];

    // correct answer
    if (question.answers[req.body.id].accept) {
        await incrementProgress(user.login);
        res.status(200).json({correct: true});
        return;
    }

    // incorrect answer
    if (shieldActivated) {
        await incrementProgress(user.login);
    } else if (!doubleActivated) {
        await setGameSessionStatus(user.login, gameStatuses.LOOSE);
    }
    res.status(200).json({correct: false});
}


export default withIronSession(handler, serverRuntimeConfig.ironSessionConfig);