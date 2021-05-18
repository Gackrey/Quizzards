export type quizQuestions = {
  question: string;
  options: string[];
  answer: number;
}
export type Action =
  | { type: "CORRECT" }
  | { type: "WRONG" }
  | { type: "NEXT" }

export type QuizState = {
  score: number;
  currentQueNo: number;
};
export type ServerData = {
  questionlist:quizQuestions[]
}
export type ServerError = {
  errorMessage: string
}