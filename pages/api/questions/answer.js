import {
    incrementProgress,
    setGameSessionStatus,
    updateGameSessionTime
} from "../../../services/gameSessionService";
import {DateTime} from "luxon";
import nc from "next-connect";
import {
    gameSessionMiddleware,
    ironSessionMiddleware,
    userCanPlayMiddleware,
    userMiddleware
} from "../../../helpers/apiMiddlewares";
import getConfig from "next/config";
import shuffleArrayBySeed from "../../../helpers/shuffleArrayBySeed";

import easyQuestions from "../../../questionsData/easyQuestions";
import mediumQuestions from "../../../questionsData/mediumQuestions";
import hardQuestions from "../../../questionsData/hardQuestions";

const {serverRuntimeConfig} = getConfig()


export default nc()
    .use(ironSessionMiddleware)
    .use(userMiddleware)
    .use(gameSessionMiddleware)
    .use(userCanPlayMiddleware)
    .post(async (req, res) => {
        const questions = [
            ...shuffleArrayBySeed(easyQuestions, req.gameSession.username).slice(0, 3),
            ...shuffleArrayBySeed(mediumQuestions, req.gameSession.username).slice(0, 3),
            ...shuffleArrayBySeed(hardQuestions, req.gameSession.username).slice(0, 4)
        ]

        const question = questions[req.gameSession.progress];

        const newEndTime = DateTime.utc().plus({seconds: 32}).toISO();
        await updateGameSessionTime(req.user.login, newEndTime);

        // if answer is correct
        if (question.answers[req.body.id].accept) {
            await incrementProgress(req.user.login);
            res.status(200).json({correct: true});
            return;
        }

        // if answer is incorrect
        await setGameSessionStatus(req.user.login, serverRuntimeConfig.GAME_STATUS.LOOSE);
        res.status(200).json({correct: false});
    })
    .all((req, res) => {
        // Respond with an error if requested method is not allowed
        res.writeHead(405, {Allow: "POST"}).send();
    });