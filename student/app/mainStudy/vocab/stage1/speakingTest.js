'use client'

import { useEffect, useState } from "react";

export default function SpeakingTest({ vocabs, onTestComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [passResults, setPassResults] = useState(
        Array(vocabs.length).fill(false) // 초기값 false로 배열 생성
    );

    const passThreshold = 70


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
        if (currentIndex < vocabs.length - 1) {
            setCurrentIndex(currentIndex + 1); // 다음 단어로 이동
        }
    };

    const handlePass = (e) => {
        e.preventDefault();
        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동
        
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

                        <VoiceRecording
                            sample={vocabs[currentIndex].english}
                            passThreshold = {passThreshold}
                            index={currentIndex} // 현재 단어의 인덱스 전달
                            onPassUpdate={handlePassUpdate}
                        />

                        <div>
                            <button onClick={handleNext} disabled = {!passResults[currentIndex]}>Next</button>
                            <button onClick={handlePass} >Pass</button>
                        </div>
                    </div>
                )

                :
                <div>
                    <h3>틀린 문항 공부하러가기</h3>
                    <button onClick={handleSubmit}>Submit</button>
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

function VoiceRecording({sample, passThreshold, onPassUpdate, index}){

    const [isRecording, setIsRecording] = useState(false);
    const [isPlayable, setIsPlayable] = useState(false);
    const [isEvaluated, setIsEvaluated] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [stream, setStream] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const [score, setScore] = useState(0);

    let audioChunks = []
    let apiMainPathSTS = 'http://127.0.0.1:3001';

    const mediaStreamConstraints = {
        audio: {
            channelCount: 1,
            sampleRate: 48000,
        },
    };

    const startMediaDevice = async () => {
        try {
            setIsSubmit(true)
    
            const newStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
            setStream(newStream);
    
            const mediaRecorder = new MediaRecorder(newStream);
    
            mediaRecorder.ondataavailable = (event) => {
                // 상태 업데이트 대신 로컬 변수에 데이터 저장
                audioChunks.push(event.data)
            };
    
            mediaRecorder.onstop = async() => {
                const blob = new Blob(audioChunks, { type: "audio/ogg;" });
                const url = URL.createObjectURL(blob);
    
                let audioBase64 = await convertBlobToBase64(blob);
    
                let minimumAllowedLength = 6;
    
                if (audioBase64.length < minimumAllowedLength) {
                    setErrorMessage("너무 짧습니다. 다시 녹음해주세요.")
                    return
                }
    
                setAudioUrl(url);
                setIsPlayable(true); // 녹음이 끝난 후 재생 가능 상태로 전환
    
                const response = await fetch(apiMainPathSTS + '/GetAccuracyFromRecordedAudio', {
                    method: "post",
                    body: JSON.stringify({ "title": sample, "base64Audio": audioBase64, "language": "en" }),
                    // headers: { "X-Api-Key": STScoreAPIKey }
    
                })

                
                if(!response.ok)
                {
                    alert('fail')
                    throw new Error("정확도 불러오기 실패")
                }
    
                const result = await response.json()
                
                const score = parseFloat(result.pronunciation_accuracy)

                if(score >= passThreshold)
                    onPassUpdate(index, true)

                setIsEvaluated(true)
                setScore(score)
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
            setIsSubmit(false)
            setIsEvaluated(false)

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

            {
                (isSubmit)?
                    (isEvaluated? 
                        <div>{score}</div>:
                        <div>평가 중</div>) 
                :   (
                        <div>제출 이전</div>
                    )
                
            }
            
        </div>
    )
}



const convertBlobToBase64 = async (blob) => {
    return await blobToBase64(blob);
}

const blobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
