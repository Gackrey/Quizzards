import './userdetails.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { User, Score } from './userdetails.types'
import { useAuth } from '../../Context/AuthProvider'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export const Userdetails = () => {
    const [user, SetUser] = useState({} as User)
    const [score, SetScore] = useState([] as Score[])
    const { LogOut } = useAuth()
    useEffect(() => {
        const userData = localStorage?.getItem("QuizAuth")
        if (userData) {
            const loginStatus = JSON.parse(userData);
            (async function () {
                await axios.get("https://quizzerd-backend.herokuapp.com/user/userDetails",
                    { headers: { authorization: loginStatus.userID } }
                )
                    .then((response) => SetUser(response.data.user))
            })();

            (async function () {
                await axios.get("https://quizzerd-backend.herokuapp.com/score/UserScores",
                    { headers: { authorization: loginStatus.userID } }
                )
                    .then((response) => SetScore(response.data))
            })()
        }
    }, [])

    return (
        <div className="user">
            {
                user.username ? <div className="user-details">
                    <h2>Username: {user.username}</h2>
                    <h2>Email: {user.email}</h2>
                    <h2>Quizzes Attempted: {score.length}</h2>
                    <h2>Highest Score: </h2>
                    <button className="btn-logout" onClick={LogOut}>Log Out</button>
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

