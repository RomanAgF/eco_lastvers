import {DateTime} from "luxon";
import getStartDateTime from "../helpers/getStartDateTime";
import getConfig from "next/config";
import {setGameSessionStatus} from "../services/gameSessionService";

const {publicRuntimeConfig, serverRuntimeConfig} = getConfig();


export default async function canAnswerMiddleware(req, res, next) {
  if (req.gameSession.status === serverRuntimeConfig.GAME_STATUS.ANSWERED) {
    return next()
  }

  const timeNow = DateTime.utc();

  const progress = req.gameSession.progress;
  const timeToAnswer = publicRuntimeConfig.TIME_TO_ANSWER;
  const timeToCheckAnswer = publicRuntimeConfig.TIME_TO_CHECK_ANSWER;

  const offset = timeToAnswer * (progress + 1) + (progress * timeToCheckAnswer);
  const endTime = getStartDateTime().plus({seconds: offset}).toUTC();

  if (timeNow > endTime) {
    console.log("[/api/questions/answer]: Too late");
    await setGameSessionStatus(req.user.login, serverRuntimeConfig.GAME_STATUS.LOOSE);
    res.status(200).send();
  }

  next();
}