'use client'

import style from "../../../styles/vocaStage2.module.css"

import { useEffect, useState, useRef } from "react";

export default function blockTest({ vocabs, onTestComplete, totalVocabs }) {
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
    let koreanList; // 오답 문제리스트
    const [wordList, setWordList] = useState([])

    const [imgModalOpen, setImgModalOpen] = useState(false)
    const clickedIndex = useRef(null)

    const [key, setKey] = useState(0)


    useEffect(() => {
        makeKoreanLIst()
        document.documentElement.style.setProperty("--animation-duration", `${initialTime}s`);
    }, []);

    // 보기 list 만들기
    useEffect(() => {

        makeKoreanLIst()

    }, [currentIndex])

    const makeKoreanLIst = () => {

        if(currentIndex >= vocabs.length){
            console.log("hi")
            return
        }

        koreanList = totalVocabs.map(item => item.korean)

        const index = koreanList.indexOf(vocabs[currentIndex]?.korean);

        if (index !== -1) {
            koreanList.splice(index, 1) // 해당 요소가 존재하면 제거
        }


        // koreanList.splice(koreanList.indexOf(vocabs[currentIndex].korea), 1)[0]
        console.log(koreanList, vocabs[currentIndex].korean, "1`23")
        let tempList = []

        for (let i = 0; i < 4; i++) {
            if (i === randomNum) {
                tempList[i] = vocabs[currentIndex].korean
                console.log(tempList[i], vocabs[currentIndex].korean, "!!")
            } else {
                let randomIndex;
                randomIndex = Math.floor(Math.random() * koreanList.length);
                tempList[i] = koreanList.splice(randomIndex, 1)[0]

            }

        }
        console.log(tempList)

        setWordList(tempList)
    }

    // timer 시간 진행 
    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // 선택된 보기도 없고, 테스트가 끝났지 않았을 시
                        if (clickedIndex.current === null && currentIndex <= vocabs.length - 1) {
                            isPassed.current = false
                            setImgModalOpen(true)
                            handlePassUpdate(currentIndex, false)
                            setTimeout(() => handleNext(), 1000)
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
        setPassResults((prevResults) => {
            const updatedResults = [...prevResults];
            updatedResults[index] = pf;
            return updatedResults;
        });
    };

    // 정답 번호, 타이머, 선택 번호, 시간 초과 여부, 안내 메시지 초기화
    const handleNext = () => {
        setTimeLeft(initialTime)
        clickedIndex.current = null

        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동
        setShouldReset(!shouldReset)
        setImgModalOpen(false)
        setRandomNum(Math.floor(Math.random() * 4))
        setKey((prev) => prev + 1)

        console.log(randomNum, currentIndex, "test")
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        onTestComplete({ result: passResults, stage: 2 }); // 결과 배열 반환
    };

    //보기 클릭 시
    const handleConfirm = (e, index) => {
        e.preventDefault()
        clickedIndex.current = index

        if (index === randomNum) {
            isPassed.current = true
        } else {
            isPassed.current = false
        }

        setImgModalOpen(true)
        handlePassUpdate(currentIndex, isPassed.current)
        setTimeout(() => handleNext(), 1000)
    }

    return (
        <div className={style.wrapper}>

            <div className={style.progressBar}>
                Progress Bar
            </div>

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
                                                {a}
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
                    <EndTestModal passResults={passResults} handleSubmit={handleSubmit} />
            }

            {
                imgModalOpen ? <ImgModal isPassed={isPassed.current} /> : <div></div>
            }
        </div>
    );
}

function ImgModal({ isPassed }) {
    return (
        <div className={style.modalOverlay}>
            <div className={style.imgBackgroundContainer}>
                <img
                    className={style.ImgModalContainer}
                    src={isPassed ? "/answer.png" : "/wrongAnswer.png"}>
                </img>
            </div>
        </div>
    )
}

function EndTestModal({ passResults, handleSubmit }) {

    const correctAnswer = passResults.filter(a => a === true).length;
    const wrongAnswer = passResults.length - correctAnswer

    return (
        <div className={style.modalOverlay}>
            <div className={style.endTestModalContainer}>
                <p className={style.endTestModalHeaderText}>Vocabulary 테스트 완료</p>
                <div className={style.countTextContainer}>
                    맞은 문제 수: {correctAnswer}개<br />틀린 문제 수: {wrongAnswer}개
                </div>
                <div className={style.checkImgContainer}>
                    <img
                        className={style.testCompleteImg}
                        src={"/testComplete.png"}>
                    </img>
                </div>
                {
                    wrongAnswer === 0 ?
                        <button className={style.homeBtn} onClick={handleSubmit}>홈으로</button>
                        :
                        <button className={style.homeBtn} onClick={handleSubmit}>틀린 단어 학습하러 가기</button>
                }
            </div>
        </div>
    )
}
