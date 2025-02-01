'use client'
import styles from "../../../public/styles/vocaStage5_Study.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation"
import TestEndPopup from "../../../utils/studyEndPop"

export default function Stage5_Study({ onTestComplete, vocabs }) {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [inputValue, setInputValue] = useState(""); // 입력값 상태
    const [vocabData, setVocabData] = useState(vocabs); // 전체 단어 데이터 저장
    const [currentWord, setCurrentWord] = useState(vocabData[0]); // 현재 단어

    const [showEnglish, setShowEnglish] = useState(false);
    const [ButtonDisplay, setButtonDisplay] = useState(false);

    const [wordList, setWordList] = useState([]); // 단어 리스트 상태 추가


    const a = onTestComplete;

    console.log(a);



    const handleInputChange = (e) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue); // 입력값 업데이트

        // 정답 여부 체크
        const isCorrect = newInputValue.trim().toLowerCase() === currentWord?.english.toLowerCase();

        if (isCorrect) {
            setShowEnglish(true); // 정답이면 영어를 숨김
            setButtonDisplay(false)
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

        // 정답 여부 확인
        const isCorrect = inputValue.trim().toLowerCase() === currentWord?.english.toLowerCase();

        if (!isCorrect) {
            setButtonDisplay(true);
            setTimeout(() => {
                setShowEnglish(true); // 1초 후 영어 표시
            }, 1000); // 1초 지연 후 showEnglish 설정
        } else {
            // 단어를 리스트에 추가
            setWordList((prevList) => [
                ...prevList,
                `${currentWord.english}`, // 한국어와 영어로 구성된 단어 추가
            ]);

            // 다음 단어로 이동
            if (currentIndex < vocabData.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                setCurrentWord(vocabData[nextIndex]); // 다음 단어 설정
                setInputValue(""); // 입력 필드 초기화
                setShowEnglish(false); // 다음 단어로 이동 시 한국어부터 표시
            } else {
                setShowPopup(true); // 모든 단어 완료 시 팝업 표시
            }
        }
    };

    const handleExit = () => {
        // 테스트를 위해 일단 push로 구현 
        router.push("/"); 
    };

    const toggleLanguage = () => {
        // 한국어/영어 상태 토글
        setShowEnglish(!showEnglish); 
    };

    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <button className={styles.exitButton} onClick={handleExit} />
                <h2>Vocabulary / Unit</h2>

                <p>다음 단어를 영어로 아는데로 작성하세요(스터디)</p>
                {/* wordBox와 wordList를 나란히 배치 */}
                <div className={styles.wordBoxWrapper}>
                    <div className={styles.wordList}>
                        <h3>단어 리스트</h3>
                        <ul>
                            {wordList.map((word, index) => (
                                <li key={index}>{index+1}. {word}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.wordBox} onClick={toggleLanguage}>
                        {currentWord ? (showEnglish ? `${currentWord.english} | ${currentWord.korean}` : currentWord.korean) : 'Loading...'}
                    </div>

                </div>

                <input
                    className={styles.input}
                    type="text"
                    placeholder="단어 입력"
                    value={inputValue}
                    onChange={handleInputChange} // 입력값이 바뀔 때마다 처리
                />
                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.button}
                        onClick={handleNext}
                        disabled={ButtonDisplay} // 정답이 아닐 경우 버튼 비활성화
                    >
                        확인
                    </button>

                    {/* 팝업 표시 */}
                    {showPopup && (
                        <TestEndPopup
                            correctCount={vocabData.length}
                            totalCount={vocabData.length}
                            onClose={() => setShowPopup(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
