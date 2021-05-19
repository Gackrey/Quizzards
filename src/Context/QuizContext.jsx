import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducer'
const initialState= { score: 0, currentQueNo: 0 };

export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <QuizContext.Provider
            value={{
                currentQueNo: state.currentQueNo,
                score: state.score,
                dispatch
            }}
        >
            {children}
        </QuizContext.Provider>
    )
};

export function useQuiz(){
    return useContext(QuizContext)
}