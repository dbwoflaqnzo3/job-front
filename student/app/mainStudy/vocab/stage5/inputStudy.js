'use client'
import styles from "../../../styles/vocaStage5_Study.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Stage5_Study({ onTestComplete, vocabs }) {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [inputValue, setInputValue] = useState(""); // 입력값 상태
    const [vocabData, setVocabData] = useState(vocabs); // 전체 단어 데이터 저장
    const [currentWord, setCurrentWord] = useState(vocabData[0]); // 현재 단어

    // 단어 카드 관련 상태
    const [showEnglish, setShowEnglish] = useState(false);
    const [ButtonDisplay, setButtonDisplay] = useState(false);

    // 단어 리스트 상태 (정답 단어만 저장)
    const [wordList, setWordList] = useState([]);

    // 단어 테스트 관련 상태
    const [isTested, setIsTested] = useState(false);
    const [inputColor, setInputColor] = useState("");

    const a = onTestComplete;
    console.log(a);

    const handleInputChange = (e) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue); // 입력값 업데이트

        // 정답 여부 체크
        const isCorrect = newInputValue.trim().toLowerCase() === currentWord?.english.toLowerCase();
 
        if (isCorrect) {
            setShowEnglish(true); // 정답이면 영어를 표시
            setButtonDisplay(false);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

        // 이미 테스트된 단어라면 wordList에 존재하므로, 바로 다음 단어로 넘어감
        if (wordList.includes(currentWord.english)) {
            if (currentIndex < vocabData.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                setCurrentWord(vocabData[nextIndex]);
                setInputValue("");
                setShowEnglish(false);
            } else {
                setShowPopup(true);
            }
            // 상태 초기화
            setIsTested(false);
            setInputColor("");
            return;
        }

        // 아직 테스트되지 않은 단어일 경우
        const isCorrect = inputValue.trim().toLowerCase() === currentWord?.english.toLowerCase();

        if (!isCorrect) {
            if (!isTested) {
                setIsTested(true);
                setInputColor("red");
            } else {
                setButtonDisplay(true);
                setTimeout(() => {
                    setShowEnglish(true); // 1초 후 영어 표시
                }, 1000);
            }
        } else {
            // 정답인 경우 wordList에 단어 추가 (중복 방지)
            setWordList((prevList) => {
                if (!prevList.includes(currentWord.english)) {
                    return [...prevList, currentWord.english];
                }
                return prevList;
            });

            // 다음 단어로 이동
            if (currentIndex < vocabData.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                setCurrentWord(vocabData[nextIndex]);
                setInputValue("");
                setShowEnglish(false);
            } else {
                setShowPopup(true);
            }
            setIsTested(false);
            setInputColor("");
        }
    };

    const toggleLanguage = () => {
        setShowEnglish(!showEnglish); 
    };

    // 단어리스트의 단어를 클릭하면 해당 단어로 이동 (테스트 여부는 그대로 유지)
    const handleWordClick = (index) => {
        setCurrentIndex(index);
        setCurrentWord(vocabs[index]);
        setInputValue("");
        setShowEnglish(false);
        setIsTested(false);
        setInputColor("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.contents}>

                <h2>Vocabulary / Unit</h2>
                <p>다음 단어를 영어로 아는데로 작성하세요(스터디)</p>
                {/* wordBox와 wordList를 나란히 배치 */}
                <div className={styles.wordBoxWrapper}>
                    <div className={styles.wordList}>
                        <h3>단어 리스트</h3>
                        <ul>
                            {wordList.map((word, index) => (
                                <li 
                                    key={index}
                                    onClick={() => handleWordClick(index)}
                                    className={index === currentIndex ? styles.selectedWord : ""}
                                >
                                    {index + 1}. {word}
                                </li>
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
                    style={{ borderColor: inputColor }} // 입력창 테두리 색상 변경
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
