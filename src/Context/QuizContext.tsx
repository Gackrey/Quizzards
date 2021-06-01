import { createContext, useContext, useReducer } from "react";
import { Quizreducer } from './Quizreducer'
import { QuizContextType } from './Context.type'
const initialState = { score: 0, currentQueNo: 0 };

export const QuizContext = createContext({} as QuizContextType);

export const QuizProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(Quizreducer, initialState)
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

export function useQuiz() {
    return useContext(QuizContext)
}