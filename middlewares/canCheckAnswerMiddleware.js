import {DateTime} from "luxon";
import getStartDateTime from "../helpers/getStartDateTime";
import getConfig from "next/config";
import {setGameSessionStatus} from "../services/gameSessionService";

const {publicRuntimeConfig, serverRuntimeConfig} = getConfig();


export default async function canAnswerMiddleware(req, res, next) {
  const timeNow = DateTime.utc();

  const progress = req.gameSession.progress;
  const timeToAnswer = publicRuntimeConfig.TIME_TO_ANSWER;
  const timeToCheckAnswer = publicRuntimeConfig.TIME_TO_CHECK_ANSWER;

  const startOffset = timeToAnswer * (progress + 1) + (progress * timeToCheckAnswer);
  const startTime = getStartDateTime().plus({seconds: startOffset}).toUTC();

  const endOffset = startOffset + timeToCheckAnswer;
  const endTime = getStartDateTime().plus({seconds: endOffset}).toUTC();

  if (timeNow > endTime) {
    console.log("[/api/questions/checkAnswer]: Too late");
    await setGameSessionStatus(req.user.login, serverRuntimeConfig.GAME_STATUS.LOOSE);
    res.status(200).send();
    return
  }

  if (timeNow < startTime) {
    res.status(403).json({message: "TOO_EARLY"});
    return
  }

  next();
}