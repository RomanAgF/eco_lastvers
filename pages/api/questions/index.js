import nc from "next-connect";
import {DateTime} from "luxon";

import ironSessionMiddleware from "../../../middlewares/ironSessionMiddleware";
import gameSessionMiddleware from "../../../middlewares/gameSessionMiddleware";
import userCanPlayMiddleware from "../../../middlewares/userCanPlayMiddleware";
import userMiddleware from "../../../middlewares/userMiddleware";

import getStartDateTime from "../../../helpers/getStartDateTime";
import getConfig from "next/config";
import getQuestion from "../../../helpers/getQuestion";

const {publicRuntimeConfig} = getConfig();

export default nc()
  .use(ironSessionMiddleware)
  .use(userMiddleware)
  .use(gameSessionMiddleware)
  .use(userCanPlayMiddleware)
  .get(async (req, res) => {
    const progress = req.gameSession.progress;
    const pickedAnswer = req.gameSession.answer;
    const questionObj = getQuestion(progress);

    const answers = questionObj.answers.map(el => ({...el}));

    // delete information about correct answers and add ID
    answers.forEach((el, index) => {
      el.id = index;
      el.accept = undefined;
      el.state = pickedAnswer === index ? "picked" : "default";
    });

    // Calculate end time
    const timeToAnswer = publicRuntimeConfig.TIME_TO_ANSWER;
    const timeToCheckAnswer = publicRuntimeConfig.TIME_TO_CHECK_ANSWER;
    const offset = timeToAnswer * (progress + 1) + (progress * timeToCheckAnswer);

    const endTime = getStartDateTime().plus({seconds: offset}).toUTC().toISO();

    const responseData = {
      name: req.user.username,
      progress: progress,
      question: {name: questionObj.question, answers},
      endTime: endTime,
      serverTime: DateTime.utc().toISO(),
    };

    res.status(200).json(responseData);
  })
  .all((req, res) => {
    // Respond with an error if requested method is not allowed
    res.writeHead(405, {Allow: "GET"}).send();
  });
