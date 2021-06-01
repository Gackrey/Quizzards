import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './scoreboard.css'
import { sortScorers } from './scoreboard.utils'
import axios from 'axios'
import { Score } from './scoreboard.types'
export function Scoreboard() {
    const [scores, SetScores] = useState([] as Score[])
    useEffect(() => {
        (async function () {
            await axios.get("https://quizzerd-backend.herokuapp.com/score/ShowAllScore"
            )
                .then((response) => SetScores(sortScorers(response.data)))
        })()
    }, [])
    const navigate = useNavigate()
    return (
        <div className='scoreboard'>
            <h1 className='heading'>Leaderboard</h1>
            {
                scores.length > 0 ?
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Genre</th>
                        </tr>
                        {scores.map(person =>
                            <tr>
                                <td>{person.username}</td>
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
