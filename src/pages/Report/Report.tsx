import './report.css'
import ScoreLogo from '../HomePage/img/score-logo.png'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
type localdata = {
    name: string | null,
    score: number | null
    genre: string | null
}
export function Report() {
    const name = new URLSearchParams(useLocation().search).get("name")
    const score = new URLSearchParams(useLocation().search).get("score")
    const genre = new URLSearchParams(useLocation().search).get("genre")
    let scorenum = 0
    if(typeof score === 'string'){
        scorenum = parseInt(score,10)
    }
    const obtainedData: localdata = { name: name, score: scorenum, genre: genre }
    const localdatastr = localStorage?.getItem('quizzerds')
    function goHome() {
        if (typeof localdatastr === 'string') {
            const localdata = JSON.parse(localdatastr)
            localdata.push(obtainedData)
            localStorage.setItem('quizzerds', JSON.stringify(localdata))
        }
        else {
            localStorage.setItem('quizzerds', JSON.stringify([obtainedData]))
        }
        navigate('/')
    }
    const navigate = useNavigate()
    return (
        <div className='report'>
            <h1 className='heading'>Quizzards of Oz.</h1>
            <div className="reportbody">
                <img src={ScoreLogo} className='logo' alt='score' />
                <h1>{name}, you scored {score}</h1>
            </div>
            <button className='btn-back' onClick={goHome}>Home</button>
        </div>
    );
}