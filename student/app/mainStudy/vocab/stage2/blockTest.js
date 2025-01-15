'use client'

import { useEffect, useState } from "react";

export default function blockTest({ vocabs, onTestComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [passResults, setPassResults] = useState(
        Array(vocabs.length).fill(false) // 초기값 false로 배열 생성
    );

    const [shouldReset, setShouldReset] = useState(false);

    const handlePassUpdate = (index, isPassed) => {
        // 특정 단어의 결과 업데이트
        setPassResults((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[index] = isPassed;
        return updatedResults;
        });
    };

    const handleNext = (e) => {
        e.preventDefault();

        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동
        setShouldReset(!shouldReset)
    };

    const handlePass = (e) => {
        e.preventDefault();
        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동

        setShouldReset(!shouldReset)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onTestComplete(passResults); // 결과 배열 반환
    };

    return (
        <div>
            {
                currentIndex <= vocabs.length-1 ?
                (
                    <div>
                        <EachWord
                            vocab={vocabs[currentIndex]} // 현재 단어 전달
                        />

                        {/* 레코딩 파트 응용해서 개발해보기  */}
                        

                        <div>
                            <button onClick={handleNext} disabled = {!passResults[currentIndex]}>Next</button>
                            <button onClick={handlePass} >Pass</button>
                        </div>
                    </div>
                )

                :
                <div>
                    <h3>{
                        passResults.every((isPassed) => isPassed) ?
                        "ALL PASS"
                        :

                        "틀린 문항 공부하러가기"
                        }</h3>
                    <button onClick={handleSubmit} >Submit</button>
                </div>
                
            }
        </div>
    );
}

function EachWord({ vocab }) {

    return (
        <div>
            <h3>Word: {vocab.english}</h3>
            <p>Meaning: {vocab.korean}</p>
        </div>
    );
}
