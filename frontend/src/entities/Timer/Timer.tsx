import React, {FC, useEffect, useState} from 'react';
import cl from './Timer.module.css'

interface TimerProps {
    setStart: React.Dispatch<React.SetStateAction<boolean>>,
    start: boolean,
    secondsNumber: number
}

const Timer:FC<TimerProps> = ({setStart, start, secondsNumber}) => {
    const [seconds, setSeconds] = useState(secondsNumber);
    let interval: NodeJS.Timeout;

    useEffect(() => {
        if (start) {
            setSeconds(secondsNumber)
            interval = setInterval(() => setSeconds((seconds) => (seconds - 1)), 1000);
        }

        return () => clearInterval(interval);
    }, [start])

    useEffect(() => {
        if (seconds === 0) {
            clearInterval(interval)
            setStart(false)
        }

    }, [seconds]);

    return (
        <span>
            <b>{seconds}</b>
        </span>
    );
};

export default Timer;