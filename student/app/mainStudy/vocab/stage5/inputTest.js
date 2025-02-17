'use client'
import styles from "../../../public/styles/vocaStage5_Test.module.css"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"
import TestEndPopup from "../../../utils/studyEndPop"

export default function InputTest({ onTestComplete, vocabs }) {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [inputValue, setInputValue] = useState(""); // 입력값 상태
    const [vocabData, setVocabData] = useState(vocabs); // 전체 단어 데이터 저장
    const [currentWord, setCurrentWord] = useState(vocabData[0]); // 현재 단어
    const [passResults, setPassResults] = useState(Array(vocabData.length).fill(false)); // 정답 상태 배열

    // 타이머 관련 상태
    const [timeLeft, setTimeLeft] = useState(3); // 초기 시간 설정 (예: 3초)
    const clickedIndex = useRef(null);
    const isPassed = useRef(true);

    // 타이머 초기 설정
    useEffect(() => {
        document.documentElement.style.setProperty("--animation-duration", `${timeLeft}s`);
    }, [timeLeft]);

    // 타이머 진행
    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        if (clickedIndex.current === null && currentIndex <= vocabData.length - 1) {
                            isPassed.current = false;
                            handlePassUpdate(currentIndex, false);
                            setTimeout(() => handleNextAutomatically(), 1000);
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeLeft, currentIndex, vocabData.length]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // 입력값 업데이트
    };

    const handleNext = (e) => {
        e.preventDefault();

        // 정답 여부 확인
        const isCorrect = inputValue.trim().toLowerCase() === currentWord?.english.toLowerCase();
        
        // passResults 업데이트
        const updatedPassResults = [...passResults];
        updatedPassResults[currentIndex] = isCorrect;
        setPassResults(updatedPassResults);

        // 다음 단어로 이동
        if (currentIndex < vocabData.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentWord(vocabData[nextIndex]); // 다음 단어 설정
            setInputValue(""); // 입력 필드 초기화
            setTimeLeft(3); // 타이머 초기화
        } else {
            setCorrectCount(updatedPassResults.filter(result => result).length); // 정답 개수 계산
            setShowPopup(true);
            console.log("passR", updatedPassResults);

            const stage = 5; 
            onTestComplete({ result: updatedPassResults, stage: stage }); // stage 추가
        }
    };

    const handleNextAutomatically = () => {
        // 자동으로 다음 단어로 이동 (타임아웃 시)
        if (currentIndex < vocabData.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentWord(vocabData[nextIndex]);
            setInputValue("");
            setTimeLeft(3); // 타이머 초기화
        } else {
            setCorrectCount(passResults.filter(result => result).length);
            setShowPopup(true);
            console.log("passR", passResults);

            const stage = 5; 
            onTestComplete({ result: passResults, stage: stage });
        }
    };

    const handleExit = () => {
        router.push("/"); 
    };

    const handlePassUpdate = (index, isPassed) => {
        const updatedPassResults = [...passResults];
        updatedPassResults[index] = isPassed;
        setPassResults(updatedPassResults);
    };

    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <button className={styles.exitButton} onClick={handleExit} />
                <h2>Vocabulary / Unit</h2>

                <p>다음 단어를 영어로 작성하세요(테스트)</p>
                <div className={styles.wordBox}>
                    {currentWord ? currentWord.korean : 'Loading...'}
                </div>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="단어 입력"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <div className={styles.buttonWrapper}>
                    <button className={styles.button} onClick={handleNext}>
                        확인
                    </button>

                    {/* 타이머 표시 */}
                    <div className={styles.timerContainer}>
                        <div className={styles.testTimer}>
                            <div className={styles.testTimerCover}></div>
                        </div>
                        <p className={styles.leftTime}>{timeLeft}s</p>
                    </div>

                    {/* 팝업 표시 */}
                    {showPopup && (
                        <TestEndPopup 
                            correctCount={correctCount} 
                            totalCount={vocabData.length} 
                            onClose={() => setShowPopup(false)} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
}