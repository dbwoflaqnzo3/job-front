'use client'
import styles from "../../../styles/vocaStage3.module.css"
import { useEffect, useState } from "react";

export default function inputTest({ vocabs, onStage3Complete , curriculumId, lessonId}) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [passResults, setPassResults] = useState(
        Array(vocabs.length).fill(false) // 초기값 false로 배열 생성
    );
    console.log("vocabs input__",vocabs)
    const [shouldReset, setShouldReset] = useState(false);

    const handleNext = (e) => {
        e.preventDefault();

        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동
        setShouldReset(!shouldReset)
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await readAllVocabData(curriculumId, lessonId)
                const updatedResult = result.map(item => ({
                    ...item, // 기존 객체 복사
                    IsPassed: false, // 새 속성 추가
                }));
                //테스트를 위해서 result로 잠시 변환 
                // setVocabs(updatedResult);
                setVocabs(result);
                setIsVocabsUpdated(true)

            } catch (err) {
                setErrorMessage(err.message); // 오류 발생 시 상태에 오류 메시지 저장
            }
        };

        fetchData();

    },[]);


    return (
    <div className={styles.container}>
        <div className={styles.contents}>
            <h2>Vocabulary / Unit</h2>

            <p>다음 단어를 영어로 작성하세요</p>
            <div className={styles.wordBox}>currentWord.korean</div>
            <input className={styles.input} type="text" placeholder="단어 입력" />
            <div className={styles.buttonWrapper}>
            <button
            className={styles.button}
            onClick={handleNext}
            >
            확인
            </button>
            </div>
        </div>
    </div>
    );
}

