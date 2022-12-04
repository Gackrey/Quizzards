import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './scoreboard.css'
import { sortAndManageScores } from './scoreboard.utils'
import axios from 'axios'
import { Score } from './scoreboard.types'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { API_URL } from '../../Constants'

export function Scoreboard() {
    const [topscores, SetTopScores] = useState([] as Score[])
    const [userscores, SetUserScores] = useState([] as Score[])
    const [isReceived, setReceived] = useState(false)
    const [chooseTab, setChoice] = useState(1)
    useEffect(() => {
        (async function () {
            await axios.get(`${API_URL}/score/ShowAllScore`
            )
                .then((response) => {
                    SetTopScores(sortAndManageScores(response.data))
                    setReceived(true)
                })
        })()
    }, [])
    useEffect(() => {
        const userData = localStorage?.getItem("QuizAuth")
        if (userData) {
            const loginStatus = JSON.parse(userData);
            (async function () {
                await axios.get(`${API_URL}/score/UserScores`,
                    { headers: { authorization: loginStatus.userID } }
                )
                    .then((response) => SetUserScores(sortAndManageScores(response.data)))
            })()
        }
    }, [])
    const navigate = useNavigate()
    return (
        <div className='scoreboard'>
            {isReceived ?
                <div>
                    <h1 className='heading-score'>Leaderboard</h1>
                    <div className="tab-body">
                        <button className="tab" onClick={() => setChoice(1)}>Top Scores</button>
                        <button className="tab" onClick={() => setChoice(2)}>Your Scores</button>
                    </div>
                    <div style={{ display: chooseTab === 1 ? "block" : "none" }}>
                        {
                            topscores.length > 0 ?
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Score</th>
                                        <th>Genre</th>
                                    </tr>
                                    {topscores.map(person =>
                                        <tr>
                                            <td>{person.username}</td>
                                            <td>{person.score}</td>
                                            <td>{person.genre}</td>
                                        </tr>)
                                    }
                                </table>
                                : <h1>No records found</h1>
                        }
                    </div>
                    <div style={{ display: chooseTab === 2 ? "block" : "none" }}>
                        {
                            userscores.length > 0 ?
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Score</th>
                                        <th>Genre</th>
                                    </tr>
                                    {userscores.map(person =>
                                        <tr>
                                            <td>{person.username}</td>
                                            <td>{person.score}</td>
                                            <td>{person.genre}</td>
                                        </tr>)
                                    }
                                </table>
                                : <h1>No records found</h1>
                        }
                    </div>
                    <button className='btn-back' onClick={() => navigate('/')}>Back</button>
                </div>
                : <Loader type="Puff" 
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            }
        </div>
    );
}
