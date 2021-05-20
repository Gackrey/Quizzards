import { useState, useEffect } from "react";
import { useNavigate } from 'react-router'
import './timer.css'
type timer = {
    optionClick: boolean,
    timerstart: boolean,
    currentQueNo: any,
    navigateto:string,
    dispatch: any
}
const TOTAL_TIME = 10;
export function Timer({ optionClick, timerstart, currentQueNo,navigateto, dispatch }: timer) {
    const [timer, setTimer] = useState(TOTAL_TIME)
    const navigate = useNavigate()
    useEffect(() => {
        if (timerstart) {
            const intervalId = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
            if (optionClick) {
                clearInterval(intervalId);
            }
            else if (currentQueNo === 9 && timer === 0) {
                navigate(navigateto)
            }
            return () => clearInterval(intervalId);
        }
    }, [timerstart, optionClick, currentQueNo, timer,navigate,navigateto]);

    useEffect(() => {
        if (timer === 0 && !optionClick) {
            dispatch({ type: "NEXT" });
        }
    }, [timer, dispatch, optionClick]);

    useEffect(() => {
        setTimer(() => TOTAL_TIME);
    }, [currentQueNo]);

    function formatTime() {
        return (
            timer === 10 ? timer : `0${timer}`
        )
    }

    return (
        <h1 className='timer'>
            <span
                style={{ color: timer > 5 ? '#23e023' : 'red' }}
                className="bg_grad"
            >00</span>
            :
            <span
                style={{ color: timer > 5 ? '#23e023' : 'red' }}
                className="bg_grad"
            >{formatTime()}</span>
        </h1>
    )
};