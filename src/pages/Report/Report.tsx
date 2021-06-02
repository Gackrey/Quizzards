import './report.css'
import ScoreLogo from '../HomePage/img/score-logo.png'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import { useAuth } from '../../Context/AuthProvider'
import axios from 'axios'
type localdata = {
    username: string | null,
    score: number | null
    genre: string | null
}
export function Report() {
    const name = new URLSearchParams(useLocation().search).get("name")
    const score = new URLSearchParams(useLocation().search).get("score")
    const genre = new URLSearchParams(useLocation().search).get("genre")
    let scorenum = 0
    const { isUserLogin } = useAuth()
    if (typeof score === 'string') {
        scorenum = parseInt(score, 10)
    }
    const obtainedData: localdata = { username: name, score: scorenum, genre: genre }
    async function goHome() {
        if (isUserLogin)
            await axios.post("https://quizzerd-backend.herokuapp.com/score/AddScore", obtainedData)
        navigate('/')
    }
    const navigate = useNavigate()
    return (
        <div className='report'>
            <h1 className='heading-report'>Quizzards of Oz.</h1>
            <div className="reportbody">
                <img src={ScoreLogo} className='logo' alt='score' />
                <h1>{name}, you scored {score}</h1>
            </div>
            <button className='btn-back' onClick={goHome}>Home</button>
        </div>
    );
}