import {setGameSessionStatus} from "../services/gameSessionService";
import getConfig from "next/config";

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

export default async function userCanPlayMiddleware(req, res, next) {
  if (req.gameSession.progress >= publicRuntimeConfig.QUESTIONS_QUANTITY) {
    await setGameSessionStatus(req.user.login, serverRuntimeConfig.GAME_STATUS.WON);
  } else if (
    (req.gameSession.status === serverRuntimeConfig.GAME_STATUS.STARTED) ||
    (req.gameSession.status === serverRuntimeConfig.GAME_STATUS.ANSWERED)
  ) {
    return next();
  }

  res.status(200).json({message: "GAME_OVER"});
}