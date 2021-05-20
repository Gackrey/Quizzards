import { Quizreducer } from './reducer'
import { QuizState, Action_QUIZ } from '../pages/Quizpage/quiz.types'
describe("Testing reducer function", () => {
    test("Score incremented on correct answer", () => {
        const initialState: QuizState = { score: 0, currentQueNo: 0 };
        const action: Action_QUIZ = { type: "CORRECT" }
        const state = Quizreducer(initialState, action)
        expect(state).toEqual({ score: 1, currentQueNo: 0 })
    })

    test("Score decremented on correct answer", () => {
        const initialState: QuizState = { score: 3, currentQueNo: 2 };
        const action: Action_QUIZ = { type: "WRONG" }
        const state = Quizreducer(initialState, action)
        expect(state).toEqual({ score: 2, currentQueNo: 2 })
    })

    test("Score not decrement if already 0", () => {
        const initialState: QuizState = { score: 0, currentQueNo: 2 };
        const action: Action_QUIZ = { type: "WRONG" }
        const state = Quizreducer(initialState, action)
        expect(state).toEqual({ score: 0, currentQueNo: 2 })
    })

    test("Question number incremented", () => {
        const initialState: QuizState = { score: 3, currentQueNo: 2 };
        const action: Action_QUIZ = { type: "NEXT" }
        const state = Quizreducer(initialState, action)
        expect(state).toEqual({ score: 3, currentQueNo: 3 })
    })

    test("Question number not incremented if reached last", () => {
        const initialState: QuizState = { score: 3, currentQueNo: 9 };
        const action: Action_QUIZ = { type: "NEXT" }
        const state = Quizreducer(initialState, action)
        expect(state).toEqual({ score: 3, currentQueNo: 9 })
    })


    test("Reset of score and question no.", () => {
        const initialState: QuizState = { score: 7, currentQueNo: 2 };
        const action: Action_QUIZ = { type: "RESET" }
        const state = Quizreducer(initialState, action)
        expect(state).toEqual({ score: 0, currentQueNo: 0 })
    })
})