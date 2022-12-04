export type quizQuestions = {
  question: string;
  options: string[];
  answer: number;
}
export type Action_QUIZ =
  | { type: "CORRECT" }
  | { type: "WRONG" }
  | { type: "NEXT" }
  | { type: "RESET" }

export type QuizState = {
  score: number;
  currentQueNo: number;
};
export type ServerData = {
  questionlist: quizQuestions[]
}
export type ServerError = {
  errorMessage: string
}