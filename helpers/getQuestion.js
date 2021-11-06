import easyQuestions from "../questionsData/easyQuestions";
import mediumQuestions from "../questionsData/mediumQuestions";
import hardQuestions from "../questionsData/hardQuestions";

const questions = [
  ...easyQuestions.slice(0, 3),
  ...mediumQuestions.slice(0, 3),
  ...hardQuestions.slice(0, 4),
];

export default function getQuestion(progress) {
  return questions[progress];
}