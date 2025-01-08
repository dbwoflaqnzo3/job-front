'use client'

import { useState } from "react";

export default function SpeakingStudy({ vocabs, onTestComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [passResults, setPassResults] = useState(
        Array(vocabs.length).fill(false) // 초기값 false로 배열 생성
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onTestComplete(passResults); // 결과 배열 반환
    };

    const handleNext = (e) => {
        e.preventDefault();
        
        setCurrentIndex(currentIndex + 1);
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        if (currentIndex > 0) 
            setCurrentIndex(currentIndex - 1); // 다음 단어로 이동
        
    }
    

    return (
        <div>
            <div>
                <EachWord
                    vocab={vocabs[currentIndex]} // 현재 단어 전달
                    index = {currentIndex + 1}
                />

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

function EachWord({ vocab, index }) {

    const handleSpeakVoice = (e) => {
        e.preventDefault()
        speakText(vocab.english)
    }

    const speakText = (text) => {
        if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.5;  // 음성 속도
        utterance.pitch = 1; // 음성 피치
        utterance.lang = "en-US"; // 음성 언어 설정
    
        // 음성을 시작
        window.speechSynthesis.speak(utterance);
        } else {
        alert("이 브라우저는 SpeechSynthesis를 지원하지 않습니다.");
        }
    }

    return (
        <div>
            <h3>[{index}] Word: {vocab.english}</h3>
            <p>Meaning: {vocab.korean}</p>
            <button onClick={handleSpeakVoice}>음성 듣기</button>
        </div>
    );
}
