import './quizpage.css';
import { useLocation } from 'react-router'
import { QuestionBox, Header, Timer } from '../../components/index'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { RequestApi } from './RequestApi'
import { quizQuestions, ServerData, ServerError } from './quiz.types'
import { useQuiz } from '../../Context/QuizContext'

export function Quizpage() {
  const { currentQueNo, score, dispatch } = useQuiz()
  const query = new URLSearchParams(useLocation().search).get("page")
  const [serverData, setServerData] = useState<ServerData | null>(null)
  const [serverFailure, setServerFailure] = useState<ServerError | null>(null)
  const [question, setQuestion] = useState<quizQuestions | null>(null)
  const [optionClick, setClickState] = useState(false)
  const [name, setName] = useState('')
  const [nameSet, setNameState] = useState(false)
  const [errorstate, setErrorstate] = useState(false)
  const [timerstart, setTimerStart] = useState(false)
  const classname = `${query}quiz`;
  useEffect(() => {
    (async function () {
      const tempData = await RequestApi(query);
      if ("questionlist" in tempData) {
        setServerData(tempData);
      }
      else
        setServerFailure(tempData)
    })();
  }, [query]);

  useEffect(() => {
    (async function () {
      if (serverData !== null && serverFailure === null) {
        await setQuestion(serverData.questionlist[currentQueNo])
      }
    })();
  }, [serverData, currentQueNo, serverFailure]);
  function startChecker() {
    if (name !== '' && /^[a-zA-Z\s]*$/.test(name)) {
      setNameState(true)
      setTimerStart(true)
      dispatch({ type: "RESET" })
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
        <Timer
          optionClick={optionClick}
          currentQueNo={currentQueNo}
          timerstart={timerstart}
          dispatch={dispatch}
        />
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
    : serverFailure !== null ?
      <div><h1 className="errorpage">{ }</h1></div>
      : <div className={classname}><h1>Loading....</h1></div>
  );
}
