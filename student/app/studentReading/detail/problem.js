'use client';
import styles from '../../styles/studentReadingReProblem.module.css';
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
              '--ratio': problemIndex,
              '--total': problemLength,
            }}
          ></div>
          <p className={styles.progressInfo}>{problemIndex + 1} / {problemLength}</p>
        </div>
  
        {/* Content Display */}
        <div className={styles.centralContainer}>
          <div className={styles.contentBlock}>
            <h3 className={styles.contentHeading}>Content: {problemIndex + 1}</h3>
            <p className={styles.contentLine}>{engContent[problemIndex]}</p>
          </div>
  
          <div className={styles.contentBlock}>
            <h3 className={styles.contentHeading}>Korean Content:</h3>
            <div className={styles.koreanWords}>
              {shuffledKorWords.map((word, index) => (
                <span
                  key={index}
                  className={`${styles.koreanWordBlock} ${selectedWords.includes(word) ? styles.selected : ''}`}
                  onClick={() => handleWordClick(word)}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
  
        {/* Selected Words */}
        <div className={styles.selectedWordsContainer}>
          <h4>선택된 단어들:</h4>
          <p>{selectedWords.join(' ')}</p>
        </div>
  
        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handlePrevious} disabled={problemIndex === 0}>
            Previous
          </button>
          <button
            className={styles.button}
            onClick={handleNextClick}
            disabled={selectedWords.length !== (korContent[problemIndex] ? korContent[problemIndex].split(' ').length : 0)}
          >
            Next
          </button>
          <button className={styles.button} onClick={handleReset}>
            새로고침
          </button>
        </div>
  
        {/* Popup */}
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
