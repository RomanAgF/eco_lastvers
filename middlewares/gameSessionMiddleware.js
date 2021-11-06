import {findGameSession} from "../services/gameSessionService";

export default async function gameSessionMiddleware(req, res, next) {
  const gs = await findGameSession(req.user.login);

  if (gs) {
    req.gameSession = gs;
    return next();
  }

  res.status(200).json({message: "GAME_NOT_STARTED"});
}