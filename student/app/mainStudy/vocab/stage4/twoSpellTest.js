'use client'
import { useRef, useState } from "react";
import { useRouter } from "next/navigation"
import styles from "../../../styles/vocaStage5_Test.module.css"
import EndTestModal from "@/app/utils/endTestModal";
import Timer from "@/app/utils/Timer";
import CheckAnswerModal from "@/app/utils/checkAnswerModal";

export default function twoInputTest({ onTestComplete, vocabs }) {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스

    const [inputValue, setInputValue] = useState(""); // 입력값 상태
    const [vocabData, setVocabData] = useState(vocabs); // 전체 단어 데이터 저장
    const [currentWord, setCurrentWord] = useState(vocabData[0]); // 현재 단어
    const [passResults, setPassResults] = useState(Array(vocabData.length).fill(false)); // 정답 상태 배열

    const [initialTime, setInitialTime] = useState(10)
    const [key, setKey] = useState(0)
    const [checkModalOpen, setCheckModalOpen] = useState(false)
    const isCorrect = useRef(null)

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // 입력값 업데이트
    };

    const handleNext = (e) => {

        // 정답 여부 확인
        isCorrect.current = inputValue.trim().toLowerCase() === currentWord?.english.toLowerCase().substr(0, 2);

        // passResults 업데이트
        setPassResults((prevResults) => {
            const updatedResults = [...prevResults];
            updatedResults[currentIndex] = isCorrect.current;
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

    const handleSubmit = (e) => {
        e.preventDefault()
        onTestComplete({ result: passResults, stage: 4 }); // stage 추가
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
                        {currentWord ?
                            `${currentWord.korean}`
                            : 'Loading...'}
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                            className={styles.input}
                            type="text"
                            maxLength={2}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <p>{currentWord.english.substr(2,)}</p>
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button className={styles.button} onClick={handleNext}>
                            확인
                        </button>
                    </div>
                </div>
            </div>
            {
                checkModalOpen &&
                <CheckAnswerModal isPassed={isCorrect.current} />

            }

            {/* 팝업 표시 */}
            {showPopup && (
                <EndTestModal passResults={passResults} handleSubmit={handleSubmit} />
            )}
        </div>
    );
}