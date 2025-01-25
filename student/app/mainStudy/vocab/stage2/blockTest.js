'use client'

import style from "../../../styles/vocaStage2.module.css"

import { useEffect, useState } from "react";

export default function blockTest({ vocabs, onTestComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [passResults, setPassResults] = useState(
        Array(vocabs.length).fill(false) // 초기값 false로 배열 생성
    );

    const [shouldReset, setShouldReset] = useState(false);

    const [isPassed, setIsPassed] = useState(true)

    // test timer
    const [timeLeft, setTimeLeft] = useState(10) // 남은 시간

    const [randomNum, setRandomNum] = useState(() => Math.floor(Math.random() * 4)); // randomNum 고정

    const [userInput, setUserInput] = useState(null)

    const timer = () => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsPassed(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(interval) // 컴포넌트 언마운트 시 클리어
        }
    }

    // timer 시간 진행 
    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsPassed(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(interval) // 컴포넌트 언마운트 시 클리어
        }
    }, [timeLeft])

    const handlePassUpdate = (index, isPassed) => {
        // 특정 단어의 결과 업데이트
        setPassResults((prevResults) => {
            const updatedResults = [...prevResults];
            updatedResults[index] = isPassed;
            return updatedResults;
        });
    };

    const handleNext = (e) => {
        e.preventDefault();

        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동
        setShouldReset(!shouldReset)
    };

    const handlePass = (e) => {

        e.preventDefault();
        setTimeLeft(10)
        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동

        setShouldReset(!shouldReset)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onTestComplete(passResults); // 결과 배열 반환
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        console.log(userInput)
        // setRandomNum(Math.floor(Math.random() * 4))
        // setTimeLeft(10)
    }

    const clickProblem = (e) => {
        e.preventDefault()
        setUserInput(e.target.value)
        console.log(userInput)
    }

    return (
        <div className={style.wrapper}>

            <div className={style.progressBar}>
                Progress Bar
            </div>

            {/* <button>
                나가기 버튼 제작
            </button> */}

            <div className={style.containerHead1}>
                <p className={style.head1}>
                    올바른 의미를 고르세요
                </p>
            </div>

            <div className={style.contentContainer}>

                    {/* 단어장 리스트 */}
                <div className={style.vocaListContainer}>
                    <p>단어 리스트</p>
                </div>


                {
                    currentIndex <= vocabs.length - 1 ?
                        (
                            <div className={style.vocaTestContainer}>
                                <div className={style.testTimer}>
                                    <p className={style.leftTime}>{timeLeft}</p>
                                </div>
                                <div>
                                    <p className={style.testVoca}>{vocabs[currentIndex].english}</p> {/*현재 단어 전달*/}
                                </div>
                            </div>
                        )

                        :
                        <div>
                            <h3>{
                                passResults.every((isPassed) => isPassed) ?
                                    "ALL PASS"
                                    :

                                    "틀린 문항 공부하러가기"
                            }</h3>
                            <button onClick={handleSubmit} >Submit</button>
                        </div>

                }
                <VocaProblems 
                    correction={vocabs[currentIndex].korean} 
                    randomNum={randomNum} 
                    userInput={userInput}
                    setUserInput={setUserInput}
                    clickProblem={clickProblem}
                />
            </div>
            <button className={style.confirmBtn} onClick={handleConfirm}>
                <p>확인</p>
            </button>
        </div>
    );
}

function EachWord({ vocab }) {

    return (
        <div>
            <p>{vocab.english}</p>
        </div>
    );
}

function VocaProblems({ correction, randomNum, userInput, setUserInput, clickProblem }) {

    const wordList = ['오답', '내 안에 흑염룡','이건 정답이 아니야', '난 실패작이야']

    return(
        <div className={style.vocaQuizList}>
            {
                wordList.map((a, i) => {
                    if(i === randomNum){
                        return(
                            <button key={i} value="true" className={style.vocaQuiz} onClick={clickProblem}>
                                    {correction}
                            </button>
                        )
                    }
                    return(
                        <button key={i} value="false" className={style.vocaQuiz} onClick={clickProblem}>
                            <p>{a}</p>
                        </button>
                    )
                })
            }
        </div>
    )
}

