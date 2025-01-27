'use client'

import { useState,useEffect } from "react";

export default function SpeakingStudy({ vocabs, onTestComplete }) {
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
                <EachWord
                    vocab={vocabs[currentIndex]} // 현재 단어 전달
                    index = {currentIndex + 1}
                />

                <VoiceRecording
                    shouldReset={shouldReset}
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

export function VoiceRecording({shouldReset}){

    const [isRecording, setIsRecording] = useState(false);
    const [isPlayable, setIsPlayable] = useState(false);

    const [stream, setStream] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    

    let audioChunks = []
    let apiMainPathSTS = 'http://127.0.0.1:3001';

    const mediaStreamConstraints = {
        audio: {
            channelCount: 1,
            sampleRate: 48000,
        },
    };

    useEffect(() => {
        
        resetRecorder();
        
    }, [shouldReset]);

    const resetRecorder = () => {
        setIsRecording(false);
        setAudioUrl(null)
        setIsPlayable(false)
        setStream(null)
        audioChunks = []
    };

    const startMediaDevice = async () => {
        try {
    
            const newStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
            setStream(newStream);
    
            const mediaRecorder = new MediaRecorder(newStream);
    
            mediaRecorder.ondataavailable = (event) => {
                // 상태 업데이트 대신 로컬 변수에 데이터 저장
                audioChunks.push(event.data)
            };
    
            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunks, { type: "audio/ogg;" });
                const url = URL.createObjectURL(blob);
    
                setAudioUrl(url);
                setIsPlayable(true); // 녹음이 끝난 후 재생 가능 상태로 전환
            };
            
    
            return mediaRecorder;
        } catch (err) {
            setErrorMessage(err.message || "An error occurred while accessing the microphone.");
        }
    };
    
    const toggleRecording = async () => {
        if (!stream) {
            const mediaRecorder = await startMediaDevice();
            if (!mediaRecorder) return;
        }
    
        if (isRecording) {
            stream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
        } else {

            audioChunks = []
            setIsRecording(true);
            const mediaRecorder = await startMediaDevice();
            mediaRecorder.start();
        }
    };
    
    const replayAudio = (e) => {
        e.preventDefault();
    
        try{
            if (audioUrl) {
                const audio = new Audio(audioUrl);
                audio.play()
            } else {
                alert("No audio to play. Please record something first.");
            }
        }catch(e){
            setErrorMessage(e)
        }
    };


    return(
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleRecording();
                }}
            >
                {isRecording ? "녹음 중지" : "녹음 시작"}
            </button>

            {isPlayable && (
                <div>
                    <button onClick={replayAudio}>녹음 재생</button>
                    <div>
                        <audio src={audioUrl} controls />
                    </div>
                </div>
            )}

            <div>{errorMessage}</div>
            
        </div>
    )
}


