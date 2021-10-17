import questions from "../../../questionsData";
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

const {serverRuntimeConfig} = getConfig()


export default nc()
    .use(ironSessionMiddleware)
    .use(userMiddleware)
    .use(gameSessionMiddleware)
    .use(userCanPlayMiddleware)
    .post(async (req, res) => {
        const question = questions[req.gameSession.progress];

        const newEndTime = DateTime.local().plus({seconds: 32}).setZone("Europe/Moscow").toISO();
        await updateGameSessionTime(req.user.login, newEndTime);

        // correct answer
        if (question.answers[req.body.id].accept) {
            await incrementProgress(req.user.login);
            res.status(200).json({correct: true});
            return;
        }

        await setGameSessionStatus(req.user.login, serverRuntimeConfig.GAME_STATUS.LOOSE);
        res.status(200).json({correct: false});
    })
    .all((req, res) => {
        // Respond with an error if requested method is not allowed
        res.writeHead(405, {Allow: "POST"}).send();
    });