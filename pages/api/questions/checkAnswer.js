import nc from "next-connect";
import getConfig from "next/config";
import ironSessionMiddleware from "../../../middlewares/ironSessionMiddleware";
import gameSessionMiddleware from "../../../middlewares/gameSessionMiddleware";
import userCanPlayMiddleware from "../../../middlewares/userCanPlayMiddleware";
import userMiddleware from "../../../middlewares/userMiddleware";
import {
  incrementProgress, setGameSessionAnswer,
  setGameSessionStatus,
} from "../../../services/gameSessionService";
import getQuestion from "../../../helpers/getQuestion";
import canCheckAnswerMiddleware from "../../../middlewares/canCheckAnswerMiddleware";

const {serverRuntimeConfig} = getConfig();

export default nc()
  .use(ironSessionMiddleware)
  .use(userMiddleware)
  .use(gameSessionMiddleware)
  .use(userCanPlayMiddleware)
  .use(canCheckAnswerMiddleware)
  .get(async (req, res) => {
    const question = getQuestion(req.gameSession.progress);
    const choosedAnswerId = req.gameSession.answer;

    // if answer is correct
    if (question.answers[choosedAnswerId]?.accept) {
      await Promise.all([
        incrementProgress(req.user.login),
        setGameSessionStatus(req.user.login, serverRuntimeConfig.GAME_STATUS.STARTED),
        setGameSessionAnswer(req.user.login, -1),
      ])
      res.status(200).json({correct: choosedAnswerId});
      return;
    }

    // if answer is incorrect
    await setGameSessionStatus(req.user.login, serverRuntimeConfig.GAME_STATUS.LOOSE);
    const correctId = question.answers.findIndex(el => el.accept);

    res.status(200).json({
      correct: correctId,
      incorrect: choosedAnswerId !== -1 ? choosedAnswerId : undefined
    });
  })
  .all((req, res) => {
    // Respond with an error if requested method is not allowed
    res.writeHead(405, {Allow: "GET"}).send();
  });
