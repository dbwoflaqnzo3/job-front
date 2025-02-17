'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"
import styles from "../../../styles/vocaStage5_Test.module.css"
import EndTestModal from "@/app/utils/endTestModal";

export default function twoInputTest({ onTestComplete, vocabs }) {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스

    const [inputValue, setInputValue] = useState(""); // 입력값 상태
    const [vocabData, setVocabData] = useState(vocabs); // 전체 단어 데이터 저장
    const [currentWord, setCurrentWord] = useState(vocabData[0]); // 현재 단어
    const [passResults, setPassResults] = useState(Array(vocabData.length).fill(false)); // 정답 상태 배열

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // 입력값 업데이트
    };

    const handleNext = (e) => {
        e.preventDefault();

        // 정답 여부 확인
        const isCorrect = inputValue.trim().toLowerCase() === currentWord?.english.toLowerCase();
        
        // passResults 업데이트
        // const updatedPassResults = [...passResults];
        // updatedPassResults[currentIndex] = isCorrect;
        // setPassResults(updatedPassResults);

        setPassResults((prevResults) => {
            const updatedResults = [...prevResults];
            updatedResults[currentIndex] = isCorrect;
            return updatedResults;
        })

        // 다음 단어로 이동
        if (currentIndex < vocabData.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentWord(vocabData[nextIndex]); // 다음 단어 설정
            setInputValue(""); // 입력 필드 초기화
        } else {
            setCorrectCount(passResults.filter(result => result).length); // 정답 개수 계산
            setShowPopup(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const stage = 4;
        onTestComplete({ result: passResults, stage:stage }); // stage 추가
    }

    return (
        <div className={styles.container}>

            {/* 본문내용 */}
            <div className={styles.contents}>
                <h2>Vocabulary / Unit</h2>

                <p>다음 단어를 영어로 작성하세요</p>
                <div className={styles.wordBox}>
                    {currentWord ? 
                    `${currentWord.korean}\n__${currentWord.english.slice(2)}`
                    : 'Loading...'}
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

                    {/* 팝업 표시 */}
                    {showPopup && (
                        <EndTestModal passResults={passResults} handleSubmit={handleSubmit} />
                    )}
                </div>
            </div>
        </div>
    );
}