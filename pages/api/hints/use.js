import {activateHint, findGameSession} from "../../../services/gameSessionService";
import unzipHint from "../../../helpers/unzipHint";
import nc from "next-connect";
import {
    gameSessionMiddleware,
    ironSessionMiddleware,
    userCanPlayMiddleware,
    userMiddleware
} from "../../../helpers/apiMiddlewares";


export default nc()
    .use(ironSessionMiddleware)
    .use(userMiddleware)
    .use(gameSessionMiddleware)
    .use(userCanPlayMiddleware)
    .post(async (req, res) => {

        // check that hint with that name is exists
        if (!["double", "shield", "half"].includes(req.body?.hint)) {
            res.status(400).json({message: "Hint is missing or incorrect"});
        }

        // if hint was used then just return
        if (req.gameSession[req.body.hint] !== 0) {
            const {double, shield, half} = req.gameSession;
            res.status(200).json({
                double: unzipHint(double),
                shield: unzipHint(shield),
                half: unzipHint(half)
            });
            return;
        }

        // if hint wasn't used then activate
        await activateHint(req.user.login, req.body.hint);
        const {double, shield, half} = await findGameSession(req.user.login);

        res.status(200).json({
            double: unzipHint(double),
            shield: unzipHint(shield),
            half: unzipHint(half)
        });
    })
    .all((req, res) => {
        // Respond with an error if requested method is not allowed
        res.writeHead(405, {Allow: "POST"}).send();
    })
