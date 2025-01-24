'use client'

// import MiddlewarePlugin from "next/dist/build/webpack/plugins/middleware-plugin";
import styles from "./study.module.css";

import { useState, useEffect, useSyncExternalStore } from "react";

export default function SpeakingStudy({ vocabs, onTestComplete }) {
    const passThreshold = 70

    // 단어를 학습했는지 확인하기 위한 배열
    const [vocabStudied, setVocabStudied] = useState(
        Array(vocabs.length).fill(false)
    )
    const [allStudied, setAllStudied] = useState(false);


    const [isToTest, setIsToTest] = useState(false);
    const togglePopup = () => {
        setIsToTest((prev) => !prev)
    }
    

    // 사용자가 녹음한 음원
    const [recordedAudio, setRecordedAudio] = useState(null)

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [passResults, setPassResults] = useState(
        // 값 변경 없음
        // vocabs.map((vocab) => vocab.IsPassed[1])

        // 초기값 false로 배열 생성
        Array(vocabs.length).fill(false) 
    );
    const [shouldReset, setShouldReset] = useState(false);

    useEffect(() => {
        
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        onTestComplete({ result: passResults, stage: 0 }); // 결과 배열 반환
    };

    const handleNext = (e) => {
        e.preventDefault();

        setCurrentIndex(currentIndex + 1);

        setShouldReset(!shouldReset)

        setRecordedAudio(null)

    };

    const handlePrevious = (e) => {
        e.preventDefault();
        if (currentIndex > 0)
            setCurrentIndex(currentIndex - 1); // 다음 단어로 이동

        setShouldReset(!shouldReset)

        setRecordedAudio(null)

    }

    const handleSpeakVoice = (e) => {
        e.preventDefault()
        speakText(vocabs[currentIndex].english)
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

    const handleAudio = (newAudio) => {
        setRecordedAudio(newAudio);
        
        // 녹음을 하면 현재 단어가 학습된 다어로 바뀌게 설정
        const tempArray = [...vocabStudied];
        tempArray[currentIndex] = true;
        setVocabStudied(tempArray);

        // 모든 단어 학습했는지 확인
        if(tempArray.every((vocab)=>vocab===true)){
            setAllStudied(true);
        }
    }

    const playMyAudio = (e) => {
        e.preventDefault();

        try {
            if (recordedAudio) {
                const audio = new Audio(recordedAudio);
                audio.play()
            } else {
                alert("No audio to play. Please record something first.");
            }
        } catch (e) {
            setErrorMessage(e)
        }
    };



    // Vocab이 많아서 벗어나려고 할 때의 샘플 모델
    const vocabulary = [
        "abundance",
        "benevolent",
        "contemplate",
        "dexterity",
        "elusive",
        "fascinate",
        "genuine",
        "harmony",
        "intrigue",
        "jubilant",
        "keen",
        "luminescent",
        "meticulous",
        "nostalgia",
        "optimistic",
        "perplex",
        "quintessential",
        "resilience",
        "tranquil",
        "whimsical"
    ];
    const tempMap = vocabulary.map((vocab, index) => <li key={index} className={index === currentIndex ? styles.active : ''}>{vocab}</li>)

    // 틀린 단어만 만듦.
    
    const vocabMap = vocabs.map((vocab, index) =>
        <li
            key={index}
            className={index === currentIndex ? styles.active : ''}
            style={{ display: index <= currentIndex ? 'list-item' : 'none' }}
        >
            {vocab.english}
        </li>
    )


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.exitBox}>
                    <button onClick={{/* 기능 구현 필요 */ }} className={styles.exitButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M15.64 30.8571L9 24M9 24L15.64 17.1429M9 24H29.5714M15.8571 8L34.1429 8.00457C36.6663 8.00686 38.7143 10.0526 38.7143 12.576V35.4217C38.7143 36.6341 38.2327 37.7969 37.3753 38.6542C36.518 39.5115 35.3553 39.9931 34.1429 39.9931L15.8571 40" stroke="#1A1A1A" strokeWidth="3.73469" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className={styles.exitWord}>나가기</p>
                    </button>
                </div>

                {/* 프로그레스 바 */}
                <div className={styles.progressBarDiv}>
                    프로그레스 바
                </div>

                <p className={styles.instruction}>단어를 발음해보세요</p>



                {/*-----메인 컨텐츠-----*/}
                <div className={styles.mainContent}>

                    {/* Vocab List */}
                    <div className={styles.vocabListBox}>
                        <p className={styles.vocabInstruction}>단어리스트</p>
                        <div className={styles.vocabList}>
                            <ol className={styles.vocabOl}>
                                {vocabMap}
                            </ol>
                        </div>
                    </div>

                    {/* Vocab Box */}
                    <div className={styles.vocabBox}>
                        <div className={styles.vocabWord}>
                            {/* 남은 단어가 있을 경우에는 단어를 띄움 */}
                            {(currentIndex <= vocabs.length - 1) && vocabs[currentIndex].english}
                        </div>
                        <div className={styles.soundButtonContainer}>
                            <button onClick={handleSpeakVoice} className={styles.computerVoice}>발음듣기</button>
                            <button onClick={playMyAudio} disabled={!recordedAudio} className={styles.myVoice}>내 발음듣기</button>
                        </div>
                    </div>

                    {/* Record Box */}
                    <div className={styles.voiceControl}>
                        <p className={styles.targetAccuracy}>목표 정확도 {passThreshold}%</p>

                        <div className={styles.voiceRecord}>
                            <VoiceRecording
                                shouldReset={shouldReset}
                                getAudio={handleAudio}
                            />
                            <div className={styles.recordInstruction}>녹음하기</div>
                            <div className={styles.recordSubInstruction}>마이크를 누르고 발음하세요</div>
                        </div>
                    </div>
                </div>


                {/* 이전 및 다음 버튼*/}
                <div className={styles.progressButton}>
                    <button className={styles.prevButton} onClick={handlePrevious} disabled={currentIndex == 0 ? true : false}>Previous</button>
                    <button className={styles.nextButton} onClick={allStudied ? togglePopup : handleNext} disabled={vocabStudied[currentIndex] === false ? true : false}>{currentIndex == vocabs.length - 1 ? "Submit" :"Next"}</button>
                </div>

                {/* 시험보러가기 팝업 */}
                {vocabStudied.every(vocab => vocab === true) && isToTest &&
                    (
                        <div className={styles.popupContainer}>
                            <div className={styles.card}>
                                <div className={styles.content}>
                                    <div className={styles.header}>
                                        <h1 className={styles.title}>Vocabulary 학습 완료</h1>
                                        <div className={styles.stats}>
                                            <div className={styles.studiedText}>학습한 단어 수: {vocabs.length}개</div>
                                        </div>
                                    </div>

                                    <div className={styles.checkmarkContainer}>
                                        <div className={styles.checkmarkCircle}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                                                <path d="M25.4658 40.4L48.0658 17.8C48.5992 17.2667 49.2214 17 49.9325 17C50.6436 17 51.2658 17.2667 51.7992 17.8C52.3325 18.3333 52.5992 18.9671 52.5992 19.7013C52.5992 20.4356 52.3325 21.0684 51.7992 21.6L27.3325 46.1333C26.7992 46.6667 26.177 46.9333 25.4658 46.9333C24.7547 46.9333 24.1325 46.6667 23.5992 46.1333L12.1325 34.6667C11.5992 34.1333 11.3432 33.5004 11.3645 32.768C11.3858 32.0356 11.6641 31.4018 12.1992 30.8667C12.7343 30.3316 13.3681 30.0649 14.1005 30.0667C14.833 30.0684 15.4658 30.3351 15.9992 30.8667L25.4658 40.4Z" fill="#0084D0" />
                                            </svg>
                                        </div>
                                    </div>

                                    <button className={styles.button} onClick={handleSubmit}>
                                        시험보러가기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>





            {/* <div>
                <div>
                    <EachWord
                        vocab={vocabs[currentIndex]} // 현재 단어 전달
                        index={currentIndex + 1}
                    />

                    <VoiceRecording
                        shouldReset={shouldReset}
                    />

                    <div>
                        <button onClick={handlePrevious} disabled={currentIndex == 0 ? true : false}>Previous</button>
                        <button onClick={handleNext} disabled={currentIndex == vocabs.length - 1 ? true : false}>Next</button>
                    </div>
                </div>

                {
                    currentIndex == vocabs.length - 1 ?
                        <div>
                            <h3>재시험 보러가기</h3>
                            <button onClick={handleSubmit}>submit</button>
                        </div>
                        :
                        <div></div>
                }

            </div> */}
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

export function VoiceRecording({ shouldReset, getAudio }) {

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
                getAudio(url);
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

        try {
            if (audioUrl) {
                const audio = new Audio(audioUrl);
                audio.play()
            } else {
                alert("No audio to play. Please record something first.");
            }
        } catch (e) {
            setErrorMessage(e)
        }
    };


    return (
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleRecording();
                }}
                className={styles.recordButton}
            >
                {isRecording ? "녹음 중지" : "녹음 시작"}
            </button>

            {/* {isPlayable && (
                <div>
                    <button onClick={replayAudio}>녹음 재생</button>
                    <div>
                        <audio src={audioUrl} controls />
                    </div>
                </div>
            )} */}

            <div>{errorMessage}</div>

        </div>
    )
}


