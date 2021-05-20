import { QuizState, Action_QUIZ } from '../pages/Quizpage/quiz.types'
export function Quizreducer(state: QuizState, action: Action_QUIZ) {
    switch (action.type) {
        case "CORRECT":
            return {
                ...state,
                score: state.score + 1
            };
        case "WRONG":
            if (state.score > 0) {
                return {
                    ...state,
                    score: state.score - 1
                };
            }
            return state;
        case "NEXT":
            if (state.currentQueNo < 9) {
                return {
                    ...state,
                    currentQueNo: state.currentQueNo + 1,
                };
            }
            return state;
        case "RESET":
            return {
                ...state,
                score: 0,
                currentQueNo: 0,
            };
    }
}