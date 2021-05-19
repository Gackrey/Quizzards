import { useState, useEffect } from "react";
import './timer.css'
type timer = {
    optionClick: boolean,
    timerstart: boolean,
    currentQueNo: any,
    dispatch: any
}
const TOTAL_TIME = 10;
export function Timer({ optionClick, timerstart, currentQueNo, dispatch }: timer) {
    const [timer, setTimer] = useState(TOTAL_TIME)

    useEffect(() => {
        if (timerstart) {
            const intervalId = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
            if (optionClick) {
                clearInterval(intervalId);
            }
            return () => clearInterval(intervalId);
        }
    }, [timerstart, optionClick]);
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
    console.log(timer);

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