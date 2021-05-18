import './quizpage.css';
import { useLocation } from 'react-router'
import QuestionBox from '../../components/QuestionBox';
import { Header } from '../../components/Header'
import { useReducer, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { RequestApi } from './RequestApi'
import { QuizState, Action, quizQuestions, ServerData } from './quiz.types'
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
  const [{ score, currentQueNo }, dispatch] = useReducer(reducer, initialState);
  const [serverData, setServerData] = useState<ServerData | null>(null)
  const [question, setQuestion] = useState<quizQuestions | null>(null)
  useEffect(() => {
    (async function () {
      const tempData = await RequestApi(query);
      if (tempData !== null) {
        console.log('one');
        setServerData(tempData);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async function () {
      console.log('two');
      if (serverData !== null) {
        await setQuestion(serverData.questionlist[currentQueNo])
      }
    })();
  }, [serverData, currentQueNo]);
  console.log(question);
  const classname = `${query}quiz`;
  const [optionClick, setClickState] = useState(false)
  const [name, setName] = useState('')
  const [nameSet, setNameState] = useState(false)
  const [errorstate, setErrorstate] = useState(false)
  function startChecker() {
    if (name !== '' && /^[a-zA-Z\s]*$/.test(name)) {
      setNameState(true)
    }
    else {
      setName('')
      setErrorstate(true)
    }
  }
  return (question !== null ?
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
    : <div className={classname}><h1>Loading....</h1></div>
  );
}
