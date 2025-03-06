import React, { useState, useEffect, useRef } from 'react';
import style from './Timer.module.css'; // 스타일 파일 import

const Timer = ({ initialTime, handleNext }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        document.documentElement.style.setProperty("--animation-duration", `${initialTime}s`);
    }, [initialTime]);

    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleNext()
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeLeft]);

    return (
        <div className={style.timerContainer}>
            <div className={style.testTimer}>
                <div className={style.testTimerCover}></div>
            </div>
            <p className={style.leftTime}>{timeLeft}s</p>
        </div>
    );
};

export default Timer;