import questions from "../../../questionsData";
import {
    deactivateHint,
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

const gameStatuses = {
    GAMESTARTED: 0,
    WON: 1,
    LOOSE: 2
}

export default nc()
    .use(ironSessionMiddleware)
    .use(userMiddleware)
    .use(gameSessionMiddleware)
    .use(userCanPlayMiddleware)
    .post(async (req, res) => {
        const shieldActivated = req.gameSession.shield === 3;
        const doubleActivated = req.gameSession.double === 3;
        const halfActivated = req.gameSession.half === 3;

        // deactivate hints
        if (shieldActivated) {
            await deactivateHint(req.user.login, "shield");
        }
        if (doubleActivated) {
            await deactivateHint(req.user.login, "double");
        }
        if (halfActivated) {
            await deactivateHint(req.user.login, "half");
        }

        const question = questions[req.gameSession.progress];

        const newEndTime = DateTime.local().plus({seconds: 32}).setZone("Europe/Moscow").toISO();
        await updateGameSessionTime(req.user.login, doubleActivated ? undefined : newEndTime);

        // correct answer
        if (question.answers[req.body.id].accept) {
            await incrementProgress(req.user.login);
            res.status(200).json({correct: true});
            return;
        }

        // incorrect answer
        if (shieldActivated) {
            await incrementProgress(req.user.login);
        } else if (!doubleActivated) {
            await setGameSessionStatus(req.user.login, gameStatuses.LOOSE);
        }
        res.status(200).json({correct: false});
    })
    .all((req, res) => {
        // Respond with an error if requested method is not allowed
        res.writeHead(405, {Allow: "POST"}).send();
    });