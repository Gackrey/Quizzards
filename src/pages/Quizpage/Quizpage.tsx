import './quizpage.css';
import { useLocation } from 'react-router'
import { QuestionBox, Header, Timer } from '../../components/index'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { RequestApi } from './RequestApi'
import { quizQuestions, ServerData, ServerError } from './quiz.types'
import { useQuiz } from '../../Context/QuizContext'
import { rules } from './Rules'
import axios from 'axios';
export function Quizpage() {
  const { currentQueNo, score, dispatch } = useQuiz()
  const query = new URLSearchParams(useLocation().search).get("page")
  const [serverData, setServerData] = useState<ServerData | null>(null)
  const [serverFailure, setServerFailure] = useState<ServerError | null>(null)
  const [question, setQuestion] = useState<quizQuestions | null>(null)
  const [optionClick, setClickState] = useState(false)
  const [name, setName] = useState('Guest')
  const [startQuiz, setStartQuiz] = useState(false)
  const [timerstart, setTimerStart] = useState(false)
  const classname = `${query}quiz`;
  const navigate = `/report?name=${name}&score=${score}&genre=${query}`
  useEffect(() => {
    const userData = localStorage?.getItem("QuizAuth")
    if (userData) {
      const loginStatus = JSON.parse(userData);
      (async function () {
        await axios.get("https://quizzerd-backend.herokuapp.com/user/userDetails",
          { headers: { authorization: loginStatus.userID } }
        )
          .then((response) => setName(response.data.user.username))
      })()
    }
  }, [])
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
    setStartQuiz(true)
    setTimerStart(true)
    dispatch({ type: "RESET" })
  }
  return (question !== null ?
    <div className={classname}>
      <div className='rulebox' style={{ display: startQuiz ? 'none' : "block" }}>
        <ul>
          {
            rules.map(rule => <li className="li-style" key={rule}>{rule}</li>)
          }
        </ul>
        <div className="btn-start" onClick={startChecker}>Start Quiz!</div>
      </div>
      <div style={{ display: startQuiz ? 'block' : "none" }}>
        <Header name={name} score={score} />
        <Timer
          optionClick={optionClick}
          currentQueNo={currentQueNo}
          timerstart={timerstart}
          dispatch={dispatch}
          navigateto={navigate}
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
                : <Link to={navigate}>
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
