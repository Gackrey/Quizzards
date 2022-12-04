import { Action_QUIZ } from '../pages/Quizpage/quiz.types'
export type AuthenticationContextType = {
    isUserLogin: boolean,
    loginUserWithCredentials: (email: string, password: string) => any
    signinUser: (username: string, email: string, password: string) => any
    LogOut: () => void,
}

export type QuizContextType = {
    currentQueNo: number,
    score: number,
    dispatch: React.Dispatch<Action_QUIZ>
}