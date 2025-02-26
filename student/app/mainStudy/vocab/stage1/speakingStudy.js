'use client'

// import MiddlewarePlugin from "next/dist/build/webpack/plugins/middleware-plugin";
import styles from "../../../styles/vocaStage1_Study.module.css";

import { useState, useEffect, useSyncExternalStore } from "react";
import EndStudyModal from "@/app/utils/endStudyModal";

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
    
    const [recordedAudio, setRecordedAudio] = useState(null) // 사용자가 녹음한 음원

    const [passResults, setPassResults] = useState(
        // 초기값 false로 배열 생성
        Array(vocabs.length).fill(false)
    );
    const [shouldReset, setShouldReset] = useState(false);

    // 단어 리스트 
    const [wordList, setWordList] = useState([]); // 단어 리스트 상태 추가
    const [vocabData, setVocabData] = useState(vocabs); // 전체 단어 데이터 저장
    const [currentWord, setCurrentWord] = useState(vocabData[0]); // 현재 단어
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스

    useEffect(() => {

    }, [wordList])

    const handleWordClick = (index) => {
        setCurrentIndex(index);
        setCurrentWord(vocabs[index]);
    };

    const handleSubmit = () => {
        onTestComplete({ result: passResults, stage: 1 }); // 결과 배열 반환
    };

    const handleNext = (e) => {
        e.preventDefault();


        // 단어를 리스트에 추가
        setWordList((prevList) => {
            if (!prevList.includes(currentWord.english)) {
                return [...prevList, currentWord.english];
            }
            return prevList;
        });

        // 다음 단어로 이동
        if (currentIndex < vocabData.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentWord(vocabData[nextIndex]); // 다음 단어 설정
        } else {
            togglePopup(); // 모든 단어 완료 시 팝업 표시
        }

        setShouldReset(!shouldReset)
        setRecordedAudio(null)

    };

    const handlePrevious = (e) => {
        e.preventDefault();
        if (currentIndex > 0)
            setCurrentIndex(currentIndex - 1); // 이전 단어로 이동

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
        if (tempArray.every((vocab) => vocab === true)) {
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
            className={index === currentIndex ? styles.currentVocab : ''}
            style={{ display: index <= currentIndex ? 'list-item' : 'none' }}
        >
            {vocab.english}
        </li>
    )

    //
    const modalControll = () => {
        setIsToTest(false)
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                <p className={styles.instruction}>단어를 발음해보세요</p>

                {/*-----메인 컨텐츠-----*/}
                <div className={styles.mainContent}>

                    {/* Vocab List */}
                    <div className={styles.vocabListBox}>
                        <p className={styles.vocabInstruction}>단어리스트</p>
                        <div className={styles.vocabList}>
                            <div className={styles.vocabOl}>
                                {wordList.map((word, index) => (
                                    <p
                                        key={index}
                                        onClick={() => handleWordClick(index)}
                                        className={index === currentIndex ? styles.selectedVocab : styles.otherVocabs}
                                    >
                                        {index + 1}. {word}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Vocab Box */}
                    <div className={styles.middleContainer}>
                        <div className={styles.vocabBox}>
                            <div className={styles.vocabWord}>
                                {/* 남은 단어가 있을 경우에는 단어를 띄움 */}
                                {(currentIndex <= vocabs.length - 1) && vocabs[currentIndex].english}
                            </div>
                            <div className={styles.soundButtonContainer}>
                                <button onClick={handleSpeakVoice} className={styles.computerVoice}>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.4em"}}>
                                        <img
                                            src="/icons/pronounceIcon.svg"
                                            alt="pronounce Icon"
                                            style={{ width: "1em", height: "1em", verticalAlign: "middle" }}
                                        />
                                        발음듣기
                                    </span>
                                </button>

                                <button onClick={playMyAudio} disabled={!recordedAudio} className={styles.myVoice}>내 발음듣기</button>
                            </div>
                        </div>
                        {/* 이전 및 다음 버튼*/}
                        <div className={styles.progressButton}>
                            <button className={styles.prevButton} onClick={handlePrevious} disabled={currentIndex == 0 ? true : false}>이전 단어</button>
                            <button className={styles.nextButton} onClick={currentIndex == vocabs.length ? togglePopup : handleNext} disabled={vocabStudied[currentIndex] === false ? true : false}>{currentIndex == vocabs.length - 1 ? "확인" : "다음 단어"}</button>
                        </div>
                    </div>

                    {/* Record Box */}
                    <div className={styles.voiceControl}>
                        <VoiceRecording
                            shouldReset={shouldReset}
                            getAudio={handleAudio}
                        />
                    </div>
                </div>




                {/* 시험보러가기 팝업 */}
                {vocabStudied.every(vocab => vocab === true) && isToTest &&
                    <EndStudyModal passResults={passResults} onTestComplete={handleSubmit} modalControll={modalControll}/>
                }
            </div>
        </div>
    );
}



// function EachWord({ vocab, index }) {

//     const handleSpeakVoice = (e) => {
//         e.preventDefault()
//         speakText(vocab.english)
//     }

//     const speakText = (text) => {
//         if (window.speechSynthesis) {
//             const utterance = new SpeechSynthesisUtterance(text);
//             utterance.rate = 0.5;  // 음성 속도
//             utterance.pitch = 1; // 음성 피치
//             utterance.lang = "en-US"; // 음성 언어 설정

//             // 음성을 시작
//             window.speechSynthesis.speak(utterance);
//         } else {
//             alert("이 브라우저는 SpeechSynthesis를 지원하지 않습니다.");
//         }
//     }

//     return (
//         <div>
//             <h3>[{index}] Word: {vocab.english}</h3>
//             <p>Meaning: {vocab.korean}</p>
//             <button onClick={handleSpeakVoice}>음성 듣기</button>
//         </div>
//     );
// }

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
        <div className={styles.voiceRecord}>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleRecording();
                }}
                className={styles.recordButton}
            >
                <img src="/icons/record.svg" alt="Mic Icon"  style={{userSelect : "none"}} draggable="false"/>
            </button>
            <p className={styles.recordInstruction}>{isRecording ? "녹음중지" : "녹음하기"}</p>
            <p className={styles.recordSubInstruction}>{isRecording ? "녹음이 끝나면 마이크를 눌러" : "마이크를 누르고 발음하세요"}</p>

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


// <div className={styles.exitBox}>
//                     <button onClick={{/* 기능 구현 필요 */ }} className={styles.exitButton}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
//                             <path d="M15.64 30.8571L9 24M9 24L15.64 17.1429M9 24H29.5714M15.8571 8L34.1429 8.00457C36.6663 8.00686 38.7143 10.0526 38.7143 12.576V35.4217C38.7143 36.6341 38.2327 37.7969 37.3753 38.6542C36.518 39.5115 35.3553 39.9931 34.1429 39.9931L15.8571 40" stroke="#1A1A1A" strokeWidth="3.73469" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                         <p className={styles.exitWord}>나가기</p>
//                     </button>
//                 </div>

