import {withIronSession} from "next-iron-session";
import getConfig from "next/config";
import unzipHint from "../../../helpers/unzipHint";
import questions from "../../../questionsData";
import isGameStarted from "../../../helpers/isGameStarted";
import {findGameSession, setGameSessionStatus} from "../../../services/gameSessionService";
import randomIntFromIntervalAndSeed from "../../../helpers/randomIntFromIntervalAndSeed";

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
        res.status(200).json({message: "GAME_OVER"});
        return;
    }

    // copy objects
    const answers = questions[gameSession.progress].answers.map(el => ({...el}));

    if (gameSession.half === 3) {
        // hide every button, that is not correct answer
        answers.forEach(el => el.hidden = !el.accept);

        // get random index of the answer that shouldn't be hidden
        const seed = gameSession.progress;
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


    const questionData = {
        name: questions[gameSession.progress].question,
        answers
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
