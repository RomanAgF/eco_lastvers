import nc from "next-connect";
import getConfig from "next/config";
import ironSessionMiddleware from "../../../middlewares/ironSessionMiddleware";
import gameSessionMiddleware from "../../../middlewares/gameSessionMiddleware";
import userCanPlayMiddleware from "../../../middlewares/userCanPlayMiddleware";
import userMiddleware from "../../../middlewares/userMiddleware";

import {
  setGameSessionStatus,
  setGameSessionAnswer
} from "../../../services/gameSessionService";
import canAnswerMiddleware from "../../../middlewares/canAnswerMiddleware";

const {serverRuntimeConfig} = getConfig();

export default nc()
  .use(ironSessionMiddleware)
  .use(userMiddleware)
  .use(gameSessionMiddleware)
  .use(userCanPlayMiddleware)
  .use(canAnswerMiddleware)
  .post(async (req, res) => {
    if (req.gameSession.status !== serverRuntimeConfig.GAME_STATUS.ANSWERED) {
      await Promise.all([
        setGameSessionAnswer(req.user.login, req.body.id),
        setGameSessionStatus(req.user.login, serverRuntimeConfig.GAME_STATUS.ANSWERED)
      ])
    }
    res.status(200).send()
  })
  .all((req, res) => {
    // Respond with an error if requested method is not allowed
    res.writeHead(405, {Allow: "POST"}).send();
  });
