import { useNavigate } from 'react-router-dom'
import './scoreboard.css'
import { sortScorers } from './scoreboard.utils'
export type localdata = {
    name: string,
    score: number,
    genre: string
}
export function Scoreboard() {
    const localdatastr = localStorage?.getItem('quizzerds')
    let localData: localdata[] = [{ name: "", score: 0, genre: '' }]
    if (typeof localdatastr === 'string') {
        localData = JSON.parse(localdatastr)
        localData = sortScorers(localData)
    }
    const navigate = useNavigate()
    return (
        <div className='scoreboard'>
            <h1 className='heading'>Leaderboard</h1>
            {
                localdatastr ?
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Genre</th>
                        </tr>
                        {localData.map(person =>
                            <tr>
                                <td>{person.name}</td>
                                <td>{person.score}</td>
                                <td>{person.genre}</td>
                            </tr>)
                        }
                    </table>
                    : <h1>No records found</h1>
            }
            <button className='btn-back' onClick={() => navigate('/')}>Back</button>
        </div>
    );
}
