import {findGameSession, setGameSessionStatus} from "../services/gameSessionService";
import questions from "../questionsData";
import {DateTime} from "luxon";
import {withIronSession} from "next-iron-session";
import getConfig from "next/config";


const {serverRuntimeConfig} = getConfig()

const gameStatuses = {
    GAMESTARTED: 0,
    WON: 1,
    LOOSE: 2
}

export function ironSessionMiddleware(req, res, next) {
    withIronSession(() => next(), serverRuntimeConfig.ironSessionConfig)(req, res)
}

export function userMiddleware(req, res, next) {
    const user = req.session.get('user');

    if (user) {
        req.user = user;
        return next();
    }

    req.session.destroy();
    res.status(401).send();
}

export function gameSessionMiddleware(req, res, next) {
    findGameSession(req.user.login).then((gs) => {
        if (gs) {
            req.gameSession = gs;
            return next();
        }
        res.status(200).json({message: "GAME_NOT_STARTED"});
    })
}

export async function userCanPlayMiddleware(req, res, next){
    const endTime = DateTime.fromJSDate(req.gameSession.endTime).setZone("Europe/Moscow");
    const currentTime = DateTime.local().setZone("Europe/Moscow");

    if (questions.length <= req.gameSession.progress) {
        await setGameSessionStatus(req.user.login, gameStatuses.WON);
    } else if (currentTime >= endTime) {
        await setGameSessionStatus(req.user.login, gameStatuses.LOOSE);
    } else if ((req.gameSession.status === gameStatuses.GAMESTARTED)) {
        return next();
    }

    res.status(200).json({message: "GAME_OVER"});
}