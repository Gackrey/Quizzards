import './userdetails.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { User, Score } from './userdetails.types'
import { useAuth } from '../../Context/AuthProvider'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { API_URL } from '../../Constants';

export const Userdetails = () => {
    const [user, SetUser] = useState({} as User)
    const [scores, SetScores] = useState([] as Score[])
    const [expert, setExpert] = useState({ score: 0, genre: "nan" } as Score)
    const { LogOut } = useAuth()
    const navigate = useNavigate();
    function logoutHandler() {
        LogOut()
        navigate('/')
    }
    useEffect(() => {
        const userData = localStorage?.getItem("QuizAuth")
        if (userData) {
            const loginStatus = JSON.parse(userData);
            (async function () {
                await axios.get(`${API_URL}/user/userDetails`,
                    { headers: { authorization: loginStatus.userID } }
                )
                    .then((response) => SetUser(response.data.user))
            })();

            (async function () {
                await axios.get(`${API_URL}/score/UserScores`,
                    { headers: { authorization: loginStatus.userID } }
                )
                    .then((response) => SetScores(response.data))
            })()
        }
    }, [])
    scores.map(curscore => {
        if (curscore.score > expert.score)
            setExpert({ score: curscore.score, genre: curscore.genre })
        return 0;
    })

    return (
        <div className="user">
            {
                user.username ? <div className="user-details">
                    <h2>Username: {user.username}</h2>
                    <h2>Email: {user.email}</h2>
                    <h2>Quizzes Attempted: {scores.length}</h2>
                    <h2>Highest Score: {expert.score}</h2>
                    <h2>Expert in: {expert.genre.toUpperCase()} quiz</h2>
                    <button className="btn-logout" onClick={logoutHandler}>Log Out</button>
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

