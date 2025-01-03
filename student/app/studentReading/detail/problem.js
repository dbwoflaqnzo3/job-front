'use client';
import styles from '../../styles/studentReadingProblem.module.css';
import { useState } from 'react';
import Link from "next/link";

// ContentDisplay 컴포넌트: 영어 및 한국어 콘텐츠를 표시
export default function ContentDisplay({ engContent, korContent, problemIndex, handleNext, handlePrevious }) {
    const [userInputs, setUserInputs] = useState([]);
    const [warning, setWarning] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const problemLength = engContent.length;

    const handleInputChange = (event, index) => {
        const inputValue = event.target.value.trim();
        const newInputs = [...userInputs];

        if (inputValue === "") {
            newInputs[index] = "";
        } else {
            newInputs[index] = inputValue;
        }

        setUserInputs(newInputs);

        const korWords = korContent[problemIndex]?.split(" ");
        // 각 단어와 비교 (korContent[problemIndex]가 유효한지 체크)
        if (korWords && korWords.every((word, idx) => newInputs[idx] === word)) {
            setWarning("크하하하하하하하하핳");
        } else {
            setWarning("");
        }
    }

    const handleNextClick = () => {
        if (problemIndex === engContent.length - 1) {
            // 마지막 문제에서 팝업 표시
            setShowPopup(true);
            handleNext(); // 문제 번호를 증가시키지 않고 팝업을 띄운 후 진행을 멈춤
        } else {
            setUserInputs([]); // 입력 값 초기화
            setWarning("");
            handleNext();  // 문제 번호를 증가시키는 함수 호출
        }
    }

    const handlePreviousClick = () => {
        setUserInputs([]);
        setWarning("");
        handlePrevious();
    }

    const closePopup = async () => {
        setShowPopup(false);
    }

    return (
        <div className={styles.container}>
            {/* progressBar */}
            <div className={styles.progressContainer}>
                <div
                    className={styles.progressBar}
                    style={{
                        '--ratio': problemIndex,  // 여기에 problemIndex를 그대로 사용
                        '--total': problemLength,
                    }}
                ></div>
            </div>
            <div className={styles.progressInfo}>
                <p>{problemIndex} / {problemLength}</p> {/* 문제 번호 1부터 시작하도록 변경 */}
            </div>

            {/* problemPage */}
            <div className={styles.content}>
                <h3 className={styles.contentHeading}>Content: {problemIndex + 1}</h3>
                {problemIndex === null
                    ? engContent.map((line, index) => (
                        <p key={index} className={styles.contentLine}>
                            {line}
                        </p>
                    ))
                    : <p className={styles.contentLine}>{engContent[problemIndex]}</p>}
            </div>

            <div className={styles.content}>
                <h3 className={styles.contentHeading}>Korean Content:</h3>
                {problemIndex === null
                    ? korContent.map((line, index) => (
                        <p key={index} className={styles.contentLine}>
                            {line}
                        </p>
                    ))
                    : (
                        <div className={styles.inputContainer}>
                            <p className={styles.contentLine}>{korContent[problemIndex]}</p>
                            <div className={styles.inputBoxes}>
                                {/* korContent[problemIndex]가 존재하는지 확인 후 처리 */}
                                {korContent[problemIndex] && korContent[problemIndex].split(" ").map((word, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={userInputs[index] || ""}
                                        onChange={(e) => handleInputChange(e, index)}
                                        placeholder={`단어 ${index}`}
                                        className={styles.inputBox}
                                    />
                                ))}
                            </div>
                            {warning && <p className={styles.warning}>{warning}</p>}
                        </div>
                    )}
            </div>

            <div className={styles.buttonContainer}>
                <button
                    className={styles.button}
                    onClick={handlePreviousClick}
                    disabled={problemIndex === null || problemIndex === 0}
                >
                    Previous
                </button>

                <button
                    className={styles.button}
                    onClick={handleNextClick}
                >
                    Next
                </button>
            </div>

            {/* 팝업 창 */}
            {showPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2>🎉 학습 완료 🎉</h2>
                        <p>수고하셨습니다! 이제 새로운 도전을 시작해 보세요.</p>
                        <Link href='/' className={styles.popupButton} onClick={closePopup}>
                            학습페이지로 돌아가기
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
