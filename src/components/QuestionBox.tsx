import { useEffect } from "react";

type QuestionsBox = {
    question: string;
    options: string[];
    answer: number;
    dispatch: Function;
    optionClick: boolean;
    setClickState: Function;
};
export const QuestionBox = ({ question, options, answer, dispatch, optionClick, setClickState }: QuestionsBox) => {
    
    useEffect(() => {
        const Buttons = document.querySelectorAll('button')
        Buttons.forEach(button => {
            button.style.backgroundColor = 'white'
            button.style.borderColor = '#007bff'
        });
    }, [question]);

    function checkAnswer(e: any, options: string[], option: string, answer: number) {
        const Buttons = document.querySelectorAll('button')
        Buttons.forEach(button => {
            if(button.innerText === options[answer-1]){
                button.style.backgroundColor = 'green'
                button.style.borderColor = 'green'
            }
        });
        if (!optionClick) {
            setClickState(true)
            if (options[answer - 1] === option) {
                e.target.style.backgroundColor = 'green'
                e.target.style.borderColor = 'green'
                dispatch({ type: "CORRECT" })
            }
            else {
                e.target.style.backgroundColor = 'red'
                e.target.style.borderColor = 'red'
                dispatch({ type: "WRONG" })
            }
        }
    }
    return (
        <div>
            <p className="question">{question}</p>
            <div className='box-area'>
                {
                    options.map(option => {
                        return (
                            <button
                                className="btn-option"
                                onClick={(e) => checkAnswer(e, options, option, answer)}
                            >{option}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    );
}
