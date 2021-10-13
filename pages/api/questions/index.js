import {withIronSession} from "next-iron-session";
import getConfig from "next/config";
import unzipHint from "../../../helpers/unzipHint";
import questions from "../../../questionsData";
import randomIntFromIntervalAndSeed from "../../../helpers/randomIntFromIntervalAndSeed";
import nc from "next-connect";
import {
    gameSessionMiddleware,
    gameStartedMiddleware,
    userCanPlayMiddleware,
    userMiddleware
} from "../../../helpers/apiMiddlewares";

const {serverRuntimeConfig} = getConfig()


const handler = nc()
    .use(gameStartedMiddleware)
    .use(userMiddleware)
    .use(gameSessionMiddleware)
    .use(userCanPlayMiddleware)
    .get(async (req, res) => {
        // copy objects
        const answers = questions[req.gameSession.progress].answers.map(el => ({...el}));

        if (req.gameSession.half === 3) {
            // hide every button, that is not correct answer
            answers.forEach(el => el.hidden = !el.accept);

            // get random index of the answer that shouldn't be hidden
            const seed = req.gameSession.progress;
            const notHidden = randomIntFromIntervalAndSeed(0, 3, seed);

            // if that index is the correct answer then hide first or next answer
            if (!answers[notHidden].accept) {
                answers[notHidden].hidden = false;
            } else if (notHidden === 3) {
                answers[0].hidden = false;
            } else {
                answers[notHidden + 1].hidden = false;
            }
        }

        // delete information about correct answers and add ID
        answers.forEach((el, index) => {
            el.id = index;
            el.accept = undefined;
        });

        const responseData = {
            name: req.user.username,
            progress: req.gameSession.progress,
            hints: {
                double: unzipHint(req.gameSession.double),
                half: unzipHint(req.gameSession.half),
                shield: unzipHint(req.gameSession.shield)
            },
            question: {
                name: questions[req.gameSession.progress].question,
                answers
            },
            endTime: req.gameSession.endTime
        }

        res.status(200).json(responseData);
    })

export default withIronSession(handler, serverRuntimeConfig.ironSessionConfig);
