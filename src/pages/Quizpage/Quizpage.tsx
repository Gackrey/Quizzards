import './quizpage.css';
import { iplquestionlist, reactquestionlist, marvelquestionlist } from '../../data/Quizzes/index';
import { useLocation } from 'react-router'
import QuestionBox from '../../components/QuestionBox';
import { Header } from '../../components/Header'
import { useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
type Action =
  | { type: "CORRECT" }
  | { type: "WRONG" }
  | { type: "NEXT" }

type QuizState = {
  score: number;
  currentQueNo: number;
};
const initialState: QuizState = { score: 0, currentQueNo: 0 };
function reducer(state: QuizState, action: Action) {
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
      return {
        ...state,
        currentQueNo: state.currentQueNo + 1,
      };
    default:
      return state;
  }
}
export function Quizpage() {
  const query = new URLSearchParams(useLocation().search).get("page")
  let templist = iplquestionlist;
  if (query === 'ipl')
    templist = iplquestionlist
  else if (query === 'marvel')
    templist = marvelquestionlist
  else
    templist = reactquestionlist
  const classname = `${query}quiz`;
  const [{ score, currentQueNo }, dispatch] = useReducer(reducer, initialState);
  const [optionClick, setClickState] = useState(false)
  const [name, setName] = useState('')
  const [nameSet, setNameState] = useState(false)
  const [errorstate, setErrorstate] = useState(false)
  let question = templist[currentQueNo];

  function startChecker() {
    if (name !== '' && /^[a-zA-Z\s]*$/.test(name)) {
      setNameState(true)
    }
    else {
      setName('')
      setErrorstate(true)
    }
  }
  return (
    <div className={classname}>
      <div className='namefield' style={{ display: nameSet ? 'none' : "block" }}>
        <div className="inputbox">
          <input
            className="input-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <span className="input-heading">Enter Name</span>
        </div>
        <p
          style={{ display: errorstate ? 'block' : "none" }}
          className='error-text'
        >Name can't be blank or a number!!!! Enter a valid name.....</p>
        <div className="btn-next" onClick={startChecker}>Start Quiz</div>
      </div>
      <div style={{ display: nameSet ? 'block' : "none" }}>
        <Header name={name} score={score} />
        <div className="quizbox">
          <h3>Question: {currentQueNo + 1}\10</h3>
          <QuestionBox
            question={question.question}
            options={question.options}
            answer={question.answer}
            dispatch={dispatch}
            optionClick={optionClick}
            setClickState={setClickState}
          />
          {
            optionClick
              ? currentQueNo < 9 ? <button
                className="btn-next"
                onClick={() => {
                  dispatch({ type: "NEXT" })
                  setClickState(false)
                }}
              >Next
            </button>
                : <Link to={`/report?name=${name}&score=${score}&genre=${query}`}>
                  <button className="btn-next">Submit</button>
                </Link>
              : ""
          }
        </div>
      </div>
    </div>
  );
}
