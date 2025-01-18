'use client'
import styles from "../../../public/styles/vocaStage3.module.css"
import { useEffect, useState } from "react";
import { readAllVocabData } from "../../../utils/VocabUtils"
import { useRouter } from "next/navigation"
import TestEndPopup from "../../../utils/studyEndPop"

export default function InputTest({ onStage3Complete, curriculumId, lessonId }) {
    const router = useRouter(); // 라우터 객체 가져오기
    const [showPopup, setShowPopup] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [currentWord, setCurrentWord] = useState(null); // 현재 단어
    const [inputValue, setInputValue] = useState(""); // 입력값 상태
    const [vocabData, setVocabData] = useState([]); // 전체 단어 데이터 저장
    let wordLength = 0;

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // 입력값 업데이트
    };

    const handleNext = (e) => {
        e.preventDefault();

        if (inputValue.trim().toLowerCase() === currentWord?.english.toLowerCase()) {
            // 정답일 경우 IsPassed를 true로 설정
            const updatedData = [...vocabData];
            updatedData[currentIndex].IsPassed = true;
            setVocabData(updatedData);
        }

        // 다음 단어로 이동
        if (currentIndex < vocabData.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentWord(vocabData[nextIndex]); // 다음 단어 설정
            setInputValue(""); // 입력 필드 초기화
        } else {

            setCorrectCount(getCorrectCount())
            setShowPopup(true)
            onStage3Complete(vocabData); // 최종 데이터 전달
        }
    };

    const getCorrectCount = () => {
        // IsPassed가 true인 항목의 개수 계산
        return vocabData.filter(item => item.IsPassed).length;
    };

    const handleExit = () => {
        // 테스트를 위해 일단 push로 구현 
        router.push("/"); 
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await readAllVocabData(curriculumId, lessonId);
                const updatedResult = result.map(item => ({
                    ...item,
                    IsPassed: false, // 새 속성 추가
                }));

                setVocabData(updatedResult); // 전체 데이터 저장
                // 첫 번째 단어 설정
                if (updatedResult.length > 0) {
                    setCurrentWord(updatedResult[0]);
                    console.log("Loaded Vocab Data:", updatedResult);
                }
            } catch (err) {
                console.error("Error fetching vocab data:", err);
            }
        };

        fetchData();
    }, [curriculumId, lessonId]);

    return (
        <div className={styles.container}>
            <div className={styles.contents}>
            <button className={styles.exitButton} onClick={handleExit}/>
                <h2>Vocabulary / Unit</h2>

                <p>다음 단어를 영어로 작성하세요</p>
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

                    {/* 팝업 표시 */}
                    {showPopup && (
                        <TestEndPopup 
                            correctCount={correctCount} 
                            totalCount={currentIndex+1} 
                            onClose={() => setShowPopup(false)} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
