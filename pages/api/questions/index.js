import nc from "next-connect";
import {
    gameSessionMiddleware,
    ironSessionMiddleware,
    userCanPlayMiddleware,
    userMiddleware
} from "../../../helpers/apiMiddlewares";
import {DateTime} from "luxon";
import shuffleArrayBySeed from "../../../helpers/shuffleArrayBySeed";

import easyQuestions from "../../../questionsData/easyQuestions"
import mediumQuestions from "../../../questionsData/mediumQuestions"
import hardQuestions from "../../../questionsData/hardQuestions"

export default nc()
    .use(ironSessionMiddleware)
    .use(userMiddleware)
    .use(gameSessionMiddleware)
    .use(userCanPlayMiddleware)
    .get(async (req, res) => {
        const questions = [
            ...shuffleArrayBySeed(easyQuestions, req.gameSession.username).slice(0, 3),
            ...shuffleArrayBySeed(mediumQuestions, req.gameSession.username).slice(0, 3),
            ...shuffleArrayBySeed(hardQuestions, req.gameSession.username).slice(0, 4)
        ]

        const answers = questions[req.gameSession.progress];

        // delete information about correct answers and add ID
        answers.forEach((el, index) => {
            el.id = index;
            el.accept = undefined;
        });

        const responseData = {
            name: req.user.username,
            progress: req.gameSession.progress,
            question: {
                name: questions[req.gameSession.progress].question,
                answers
            },
            endTime: req.gameSession.endTime,
            serverTime: DateTime.utc().toISO()
        }

        res.status(200).json(responseData);
    })
    .all((req, res) => {
        // Respond with an error if requested method is not allowed
        res.writeHead(405, {Allow: "GET"}).send()
    });
