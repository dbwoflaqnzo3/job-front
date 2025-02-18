'use client'
import styles from "../../../styles/vocaStage5_Test.module.css"
import { useState, useEffect, useRef } from "react";
import EndTestModal from "@/app/utils/endTestModal";
import Timer from "@/app/utils/Timer";
import CheckAnswerModal from "@/app/utils/checkAnswerModal";

export default function InputTest({ onTestComplete, vocabs }) {
    const [showPopup, setShowPopup] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [inputValue, setInputValue] = useState(""); // 입력값 상태
    const [vocabData, setVocabData] = useState(vocabs); // 전체 단어 데이터 저장
    const [currentWord, setCurrentWord] = useState(vocabData[0]); // 현재 단어
    const [passResults, setPassResults] = useState(Array(vocabData.length).fill(false)); // 정답 상태 배열
    const [checkModalOpen, setCheckModalOpen] = useState(false) //단어 제출 시 정답 여부 img modal 표시

    // 타이머 관련 상태
    const [initialTime, setInitialTime] = useState(10)
    const [key, setKey] = useState(0) // key 값이 증가할 때마다 타이머 재랜더링됨
    const isPassed = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // 입력값 업데이트
    };

    const handleNext = () => {

        // 정답 여부 확인
        isPassed.current = inputValue.trim().toLowerCase() === currentWord?.english.toLowerCase();

        // passResults 업데이트
        setPassResults((prevResults) => {
            const updatedResults = [...prevResults];
            updatedResults[currentIndex] = isPassed.current;
            return updatedResults;
        })

        setCheckModalOpen(true)
        setTimeout(() => moveToNext(), 1000)

    };

    const moveToNext = () => {

        setCheckModalOpen(false)

        // 다음 단어로 이동
        if (currentIndex < vocabData.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentWord(vocabData[nextIndex]); // 다음 단어 설정
            setInputValue(""); // 입력 필드 초기화
            setKey((prev) => prev + 1)
        } else {
            setShowPopup(true);
        }
    }

    const handleSpeakVoice = (e) => {
        e.preventDefault()
        e.stopPropagation()
        speakText(currentWord.english)
    }

    // 학습 단어 발음 듣기
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

    const handleSubmit = () => {
        onTestComplete({ result: passResults, stage: 5 })
    }

    return (
        <div className={styles.container}>


            <div className={styles.containerHead1}>
                <p className={styles.head1}>
                    다음 단어를 영어로 작성하세요
                </p>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.timerContainer} key={key}>
                    <Timer initialTime={initialTime} handleNext={handleNext} />
                </div>
                <div className={styles.wordBoxContainer}>
                    <div className={styles.wordBox}>
                        <p>
                            {currentWord ?
                                `${currentWord.korean}`
                                : 'Loading...'}
                        </p>

                        <button className={styles.pronounceBtn} onClick={handleSpeakVoice}>
                            <img src="/icons/pronounceIcon.svg" className={styles.pronounceIcon}></img>
                            발음듣기
                        </button>
                    </div>

                    <input
                        className={styles.inputAllSpell}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="단어를 입력해주세요."
                    />

                    <div className={styles.buttonWrapper}>
                        <button className={styles.button} onClick={handleNext}>
                            확인
                        </button>
                    </div>
                </div>
            </div>

            {
                checkModalOpen &&
                <CheckAnswerModal isPassed={isPassed.current} />

            }

            {/* 팝업 표시 */}
            {showPopup && (
                <EndTestModal
                    passResults={passResults}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
}