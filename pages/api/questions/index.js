import {withIronSession} from "next-iron-session";
import getConfig from "next/config";
import prisma from "../../../context/prisma";
import unzipHint from "../../../helpers/unzipHint";
import questions from "../../../questionsData";
import isGameStarted from "../../../helpers/isGameStarted";
import {findGameSession, setGameSessionStatus} from "../../../services/gameSessionService";

const {serverRuntimeConfig} = getConfig()

const gameStatuses = {
    GAMESTARTED: 0,
    WON: 1,
    LOOSE: 2
}


async function handler(req, res) {
    const user = req.session.get('user');
    if (!user) {
        res.status(401).send();
        return;
    }

    const gameSession = await findGameSession(user.login);

    if ((gameSession.status !== gameStatuses.GAMESTARTED) || (!isGameStarted())) {
        res.status(200).json({message: "GAME_OVER"});
        return;
    }

    if (questions.length <= gameSession.progress) {
        await setGameSessionStatus(user.login, gameStatuses.WON);
        res.status(200).json({message: "GAME_OVER"});
        return;
    }

    const questionData = {
        name: questions[gameSession.progress].question,
        answers: questions[gameSession.progress].answers.map((el, index) =>
            ({id: index, text: el.text})
        ),
    }

    const responseData = {
        name: user.username,
        progress: gameSession.progress,
        hints: {
            double: unzipHint(gameSession.double),
            half: unzipHint(gameSession.half),
            shield: unzipHint(gameSession.shield)
        },
        question: questionData
    }

    res.status(200).json(responseData);
}

export default withIronSession(handler, serverRuntimeConfig.ironSessionConfig);
