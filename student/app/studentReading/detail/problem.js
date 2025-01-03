'use client';
import styles from '../../styles/studentReadingProblem.module.css';
import { useState } from 'react';

// ContentDisplay 컴포넌트: 영어 및 한국어 콘텐츠를 표시
export default function ContentDisplay({ engContent, korContent, problemIndex , handleNext , handlePrevious}) {
    const [userInputs , setUserInputs] = useState([]);
    const [warning , setWarning] = useState("")
    const problemLength = engContent.length;
    
  
    const handleInputChange = (event , index) => {
        const inputValue = event.target.value.trim();  
        const newInputs = [...userInputs];
      
        if(inputValue === ""){
          newInputs[index] = ""
        } else {
          newInputs[index] = inputValue;
        }
    
        setUserInputs(newInputs);

        const korWords = korContent[problemIndex].split(" ");
        // 각 단어와 비교
        if (korWords.every((word, idx) => newInputs[idx] === word)) {
          setWarning("크하하하하하하하하핳");
        } else {
          setWarning("");
        }
    }

    const handleNextClick = () => {
      setUserInputs([]);
      setWarning("")
      handleNext();
    }

    const handlePreviousClick = () => {
      setUserInputs([]);
      setWarning("")
      handlePrevious();
    }

    return (
    <div className={styles.container}>
      {/* progressBar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ '--ratio': problemIndex }}></div>
      </div>
      <div className={styles.progressInfo}>
        <p>{problemIndex} / {problemLength}</p>
      </div>
      {/* problemPage */}
      <div className={styles.content}>
        <h3 className={styles.contentHeading}>Content: {problemIndex+1}</h3>
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
                {korContent[problemIndex].split(" ").map((word, index) => (
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

      <div>
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
          disabled={problemIndex === null || problemIndex === engContent.length - 1}
        >
          Next
        </button>
      </div>
    </div>

  );
}
