'use client'

import style from "../../../styles/vocaStage2.module.css"
import { useState, useEffect, useRef } from "react"

export default function BlockStudy({ vocabs, onTestComplete }) {

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [wordList, setWordList] = useState([])
    const [disabledTimer, setDisabledTimer] = useState(false)

    //timer
    const [initialTime, setInitialTime] = useState(10)
    const [timeLeft, setTimeLeft] = useState(initialTime) // 남은 시간
    const [key, setKey] = useState(0) //timer css 초기화 용도 (컴포넌트 요소 안에 변경 사항이 생기면 컴포넌트가 재랜더링됨 key를 1증가시킴으로써 재랜더링하며 timer 초기화)
    const [isTimeOut, setIsTimeOut] = useState(false)
    const [isSelfTimeControl, setIsSelfTimeControl] = useState(false)
    const timeOption = ["직접", "3", "7", "10"]

    // 선생님이 지정한 animation duration으로 설정
    useEffect(() => {
        document.documentElement.style.setProperty("--animation-duration", `${initialTime}s`);
    }, [initialTime]);

    // timer 시간 진행 
    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsTimeOut(true)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(interval) // 컴포넌트 언마운트 시 클리어
        }
    }, [timeLeft])

    // 다음 단어로 이동
    const handleNext = () => {

        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동

        // 현재 단어 index와 학습한 단어 index 비교
        if(!wordList.includes(vocabs[currentIndex])){
            setWordList([...wordList, vocabs[currentIndex]])
        }

        setKey((prev)=>prev+1)
        setTimeLeft(initialTime)
        setIsTimeOut(false)
    };

    //list에 있는 voca 클릭
    const clickListVoca = (i) => {
        setCurrentIndex(i)
        setKey((prev) => prev+1)
        setTimeLeft(initialTime)
        setIsTimeOut(false)
    }
    
    const selectTimeOption = (e, t) => {
        e.preventDefault()
        
        // timer 옵션에서 직접 선택했을 시 
        if(t === 0){
            setDisabledTimer(true)
            setIsSelfTimeControl(true)
        } // timer 옵션에서 시간 선택 시
        else {
            setIsSelfTimeControl(false)
            setDisabledTimer(false)
            setIsTimeOut(false)
            setInitialTime(timeOption[t])
            setTimeLeft(timeOption[t])

            //timer 초기화
            setKey((prev) => prev+1)
        }
    }

    return (
        <div className={style.wrapper}>

            <div className={style.progressBar}>
                Progress Bar
            </div>

            {/* <button>
                나가기 버튼 제작
            </button> */}

            {/* 학습 목표 */}
            <StudyPurpose />

            {/* study content */}
            <div className={style.contentContainer}>

                {/* Vocab List */}
                <div className={style.vocabListBox}>
                    <p className={style.vocabInstruction}>단어리스트</p>
                    <div className={style.vocabList}>
                        {
                            wordList !== null ?
                                wordList.map((a, i) => {
                                    return (
                                        <button
                                            className={`${style.vocabBtn} ${i === currentIndex ? style.clickedVocabBtn : ""}`}
                                            key={i} onClick={() => clickListVoca(i)}
                                        >
                                            <p
                                                className={`${style.vocabOl} ${i === currentIndex ? style.clickedVocab01 : ""}`}
                                            >
                                                {i + 1}. {a.english}
                                            </p>
                                        </button>
                                    )
                                })
                                :
                                <div></div>

                        }
                    </div>
                </div>

                {/* Word Card */}
                <EachWord
                    vocab={vocabs[currentIndex]}
                    isTimeOut={isTimeOut}
                    isSelfTimeControl = {isSelfTimeControl}
                />

                <div className={style.selectLimitTimeContainer}>

                    {/* test timer */}
                    {
                        !disabledTimer ? 
                        //timer option에서 직접을 선택 안 했을 시
                        <div className={style.timerContainer}>
                            <div className={style.testTimer}>
                                <div className={style.testTimerCover} key={key}>
                                </div>
                            </div>
                            <p className={style.leftTime}>{timeLeft}s</p>
                        </div>
                        :
                        <div></div>
                    }

                    {/* time option */}
                    <div className={style.timerOptionContainer}>
                        <p className={style.timerInstruction}>선택한 시간이 지나면 카드가 뒤집혀요</p>
                        <div className={style.optionContainer}>
                            {
                                timeOption.map((a, i) => {

                                    if (i > 0) {
                                        return (
                                            <button className={style.timeOption} key={i} onClick={(e) => selectTimeOption(e, i)}>{a}초</button>
                                        )
                                    }
                                    else {
                                        return (
                                            <button className={style.timeOption} key={i} onClick={(e) => selectTimeOption(e, i)}>{a}</button>
                                        )
                                    }

                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <NextVoca handleNext={handleNext}/>
        </div>
    );
}

function StudyPurpose({ }) {
    return (
        <div className={style.containerHead1}>
            <p className={style.head1}>
                단어 카드를 클릭하여 한글 뜻을 확인해보세요
            </p>
        </div>
    )
}

function EachWord({ vocab, isTimeOut, isSelfTimeControl }) {

    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        setIsClicked(isTimeOut)
    }, [isTimeOut])

    const handleSpeakVoice = (e) => {
        e.preventDefault()
        e.stopPropagation()
        speakText(vocab.english)
    }

    const speakText = (text) => {        
        if (window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.5;  // 음성 속도
            utterance.pitch = 1; // 음성 피치
            utterance.lang = "en-US"; // 음성 언어 설정

            // 음성을 시작
            window.speechSynthesis.speak(utterance);
        } else {
            alert("이 브라우저는 SpeechSynthesis를 지원하지 않습니다.");
        }
    }

    const wordCardClicked = () => {
        if(isTimeOut || isSelfTimeControl){
            setIsClicked((prev) => !prev)
        }
    }

    return (
        <div 
            className={style.studyWordCardContainer}
            onClick={wordCardClicked}
        >
            <div className={`${style.cardInner} ${isClicked ? style.flipped : ""}`}>
                <div className={style.flipCardFront}>
                    <p className={style.studyCurrentVoca} >{vocab.english}</p>
                    <button className={style.pronounceBtn} onClick={handleSpeakVoice}>
                        <img src="/pronounceIcon.svg" className={style.pronounceIcon}></img>
                        발음듣기
                    </button>
                </div>
                <div className={style.flipCardBack}>
                    <p className={style.studyCurrentVoca} >{vocab.korean}</p>
                </div>
            </div>            
        </div>
    );
}

function NextVoca({ handleNext }) {

    return (
        <div className={style.nextVocaBtnContainer}>
            <button className={style.nextVocaBtn} onClick={handleNext}>
                다음 단어
            </button>
        </div>
    )
}

function EndStudyModal({ passResults, handleSubmit }) {

    return (
        <div className={style.modalOverlay}>
            <div className={style.endTestModalContainer}>
                <p className={style.endTestModalHeaderText}>Vocabulary 학습 완료</p>
                <div className={style.checkImgContainer}>
                    <img
                        className={style.testCompleteImg}
                        src={"/testComplete.png"}>
                    </img>
                </div>
                <button className={style.buttonConfirm} onClick={() => setModalOpen(false)}>테스트 하러 가기</button> 
                <button className={style.buttonCancel} onClick={() => setModalOpen(false)}>계속 학습하기</button>
            </div>
        </div>
    )
}