'use client'

import { useState,useEffect } from "react";

export default function inputTest({ vocabs, onTestComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [passResults, setPassResults] = useState(
        Array(vocabs.length).fill(false) // 초기값 false로 배열 생성
    );
    const [shouldReset, setShouldReset] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onTestComplete(passResults); // 결과 배열 반환
    };

    const handleNext = (e) => {
        e.preventDefault();
        
        setCurrentIndex(currentIndex + 1);

        setShouldReset(!shouldReset)
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        if (currentIndex > 0) 
            setCurrentIndex(currentIndex - 1); // 다음 단어로 이동

        setShouldReset(!shouldReset)
        
    }
    

    return (
        <div>
            <div>
                {/* //여기에 코드작성 */}


                <div>
                    <button onClick={handlePrevious} disabled={currentIndex == 0? true:false}>Previous</button>
                    <button onClick={handleNext} disabled={currentIndex == vocabs.length-1? true:false}>Next</button>
                </div>
            </div>

            {
                currentIndex == vocabs.length-1 ? 
                <div>
                    <h3>재시험 보러가기</h3>
                    <button onClick={handleSubmit}>submit</button>
                </div>
                :
                <div></div>
            }
            
        </div>
    );
}
