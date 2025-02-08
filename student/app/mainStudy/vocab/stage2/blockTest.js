'use client'

import style from "../../../styles/vocaStage2.module.css"

import { useEffect, useState, useRef } from "react";

export default function blockTest({ vocabs, onTestComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [passResults, setPassResults] = useState(
        Array(vocabs.length).fill(false) // 초기값 false로 배열 생성
    );
    const [shouldReset, setShouldReset] = useState(false);
    const isPassed = useRef(false)

    // test timer
    const [initialTime, setInitialTime] = useState(10)
    const [timeLeft, setTimeLeft] = useState(initialTime) // 남은 시간

    //test kit
    const [randomNum, setRandomNum] = useState(() => Math.floor(Math.random() * 4)); // 정답 번호
    const wordList = ['오답', '내 안에 흑염룡', '이건 정답이 아니야', '난 실패작이야'] // 오답 문제리스트

    const [imgModalOpen, setImgModalOpen] = useState(false)
    const clickedIndex = useRef(null)

    const [key, setKey] = useState(0)


    useEffect(() => {
        document.documentElement.style.setProperty("--animation-duration", `${initialTime}s`);
      }, []);

    // timer 시간 진행 
    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // 선택된 보기도 없고, 테스트가 끝났지 않았을 시
                        if(clickedIndex.current === null && currentIndex <= vocabs.length - 1){
                            isPassed.current = false
                            setImgModalOpen(true)
                            handlePassUpdate(currentIndex, false)
                            setTimeout(()=>handleNext(), 1000)
                        }
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(interval) // 컴포넌트 언마운트 시 클리어
        }
    }, [timeLeft])

    const handlePassUpdate = (index, pf) => {
        // 특정 단어의 결과 업데이트
        console.log(index, pf)

        setPassResults((prevResults) => {
            const updatedResults = [...prevResults];
            updatedResults[index] = pf;
            console.log(updatedResults)
            return updatedResults;
        });
    };

    // 정답 번호, 타이머, 선택 번호, 시간 초과 여부, 안내 메시지 초기화
    const handleNext = () => {
        setRandomNum(Math.floor(Math.random() * 4))
        setTimeLeft(initialTime)
        clickedIndex.current = null

        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동
        setShouldReset(!shouldReset)
        setImgModalOpen(false)
        setKey((prev) => prev+1)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(passResults)
        onTestComplete({result: passResults, stage: 2}); // 결과 배열 반환
    };

    //보기 클릭 시
    const handleConfirm = (e, index) => {
        e.preventDefault()
        clickedIndex.current = index

        console.log(passResults)

        if(index === randomNum){
            console.log("정답 여기")
            isPassed.current = true
        } else{
            console.log("오답 여기")
            isPassed.current = false
        }

        setImgModalOpen(true)
        handlePassUpdate(currentIndex, isPassed.current)
        setTimeout(()=>handleNext(), 1000)
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

            {
                currentIndex <= vocabs.length - 1 ? 
                    <div className={style.contentContainer}>

                        {/* test timer */}
                        <div className={style.timerContainer}>
                            <div className={style.testTimer}>
                                <div className={style.testTimerCover} key={key}>
                                </div>
                           </div>
                            <p className={style.leftTime}>{timeLeft}s</p>
                        </div>

                        {/* vocab card */}
                        <div className={style.wordCardContainer}>
                            <p className={style.currentVoca}>{vocabs[currentIndex].english}</p> {/*현재 단어 전달*/}
                        </div>

                        {/* test 보기 list */}
                        <div className={style.vocaQuizList}>
                            {
                                wordList.map((a, i) => {
                                    if (i === randomNum) {
                                        return (
                                            <button
                                                onClick={(e) => handleConfirm(e, i)}
                                                className={`${style.vocaQuiz} ${i === clickedIndex.current ? style.vocaQuizClicked : ""}`}
                                            >
                                                {vocabs[currentIndex].korean}
                                            </button>
                                        )
                                    }
                                    return (
                                        <button 
                                            onClick={(e) => handleConfirm(e, i)}
                                            className={`${style.vocaQuiz} ${i === clickedIndex.current ? style.vocaQuizClicked : ""}`}
                                        >
                                            {a}
                                        </button>
                                    )
                                })
                            }
                        </div >
                    </div>
                :
                <EndTestModal passResults={passResults} handleSubmit={handleSubmit}/>
            }

            {
                imgModalOpen ? <ImgModal isPassed={isPassed.current} /> : <div></div>
            }
        </div>
    );
}

function ImgModal({isPassed}){
    return (
        <div className={style.modalOverlay}>
            <img
                className={style.ImgModalContainer}
                src={isPassed ? "/answer.png" : "/wrongAnswer.png"}>
            </img>
            {
                isPassed ? <p className={style.answer}>정답!</p> : <p className={style.wrongAnswer}>오답...</p>
            }
        </div>
    )
}

function EndTestModal({passResults, handleSubmit}){

    const correctAnswer = passResults.filter(a => a === true).length;
    const wrongAnswer = passResults.length - correctAnswer

    return(
        <div className={style.modalOverlay}>
            <div className={style.endTestModalContainer}>
                <p className={style.endTestModalHeaderText}>Vocabulary 테스트 완료</p>
                <div className={style.countTextContainer}>
                    맞은 문제 수: {correctAnswer}개<br/>틀린 문제 수: {wrongAnswer}개
                </div>
                <div className={style.checkImgContainer}>
                    <img
                        className={style.testCompleteImg}
                        src={"/testComplete.png"}>
                    </img>
                </div>
                <button className={style.homeBtn} onClick={handleSubmit}>홈으로</button>
            </div>
        </div>
    )
}
