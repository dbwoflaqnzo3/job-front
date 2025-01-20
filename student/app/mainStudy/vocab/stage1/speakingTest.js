'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function SpeakingTest({ vocabs, onTestComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스
    const [passResults, setPassResults] = useState(
        Array(vocabs.length).fill(false) // 초기값 false로 배열 생성
    );

    const [shouldReset, setShouldReset] = useState(false);

    const [score, setScore] = useState(null);
    const [isToStudy, setIsToStudy] = useState(false);

    const passThreshold = 70

    useEffect(() => {

    }, [])

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
        setScore(null)
    };

    const handlePass = (e) => {
        e.preventDefault();
        //마지막 단어인데 Pass 했을 경우 학습페이지로 이동
        if (currentIndex === vocabs.length - 1) {
            togglePopup();
            return;
        }

        setCurrentIndex(currentIndex + 1); // 다음 단어로 이동


        setShouldReset(!shouldReset)
        setScore(null)

    }

    const handleScoreUpdate = (newScore) => {
        setScore(newScore); // Update the score when VoiceRecording provides a new value
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onTestComplete({ result: passResults, stage: 1 }); // 결과 배열 반환
    };

    const togglePopup = () => {
        setIsToStudy((prev) => !prev);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {/* 프로그레스 바 */}
                <div className={styles.progressBarDiv}>
                </div>

                <p className={styles.instruction}>단어를 발음해보세요</p>

                {/* 메인 컨텐츠 */}
                <div className={styles.mainContent}>
                    {/* <div className={styles.vocabList}>

                    </div> */}

                    <div className={score === null ? styles.vocabBox : (passResults[currentIndex] ? styles.vocabBoxPassed : styles.vocabBoxFailed)}>
                        {/* <EachWord vocab={vocabs[currentIndex]} // 현재 단어 전달
                        /> */}
                        <div className={styles.vocabWord}>
                            {/* 남은 단어가 있을 경우에는 단어를 띄움 */}
                            {(currentIndex <= vocabs.length - 1) && vocabs[currentIndex].english}
                        </div>
                    </div>

                    <div className={styles.voiceControl}>
                        <p className={styles.targetAccuracy}>목표 정확도 {passThreshold}%</p>

                        <div className={styles.allBadges}>
                            <div className={styles.accBadge}>
                                <div className={styles.circle}></div>
                                <p className={styles.percent}>{score === null ? '-' : score}%</p>
                            </div>
                            <div className={styles.accBadge}>
                                <div className={styles.circle}></div>
                                <p className={styles.percent}>{score}%</p>
                            </div>
                            <div className={styles.accBadge}>
                                <div className={styles.circle}></div>
                                <p className={styles.percent}>{score}%</p>
                            </div>
                        </div>

                        <div className={styles.voiceRecord}>
                            <VoiceRecording
                                sample={vocabs[currentIndex].english}
                                passThreshold={passThreshold}
                                index={currentIndex} // 현재 단어의 인덱스 전달
                                onScoreUpdate={handleScoreUpdate}
                                onPassUpdate={handlePassUpdate}
                                shouldReset={shouldReset}
                            />
                        </div>







                    </div>
                </div>

                {/* 제출 버튼 */}
                <div className={styles.progressButton}>
                    <button className={styles.nextButton} onClick={handleNext} disabled={!passResults[currentIndex]}>Next</button>
                    <button className={styles.passButton} onClick={handlePass} >Pass</button>
                </div>
                <button onClick={togglePopup} />

                {isToStudy &&
                    (
                        <div className={styles.popupContainer}>
                            <div className={styles.card}>
                                <div className={styles.content}>
                                    <div className={styles.header}>
                                        <h1 className={styles.title}>Vocabulary 테스트 완료</h1>
                                        <div className={styles.stats}>
                                            <div className={styles.statText}>맞은 문제 수: 15개</div>
                                            <div className={styles.wrongText}>틀린 문제 수: 15개</div>
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
                                        틀린 문항 공부하러가기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }


                {/* <div>
                    {
                        currentIndex <= vocabs.length - 1 ?
                            (
                                <div>
                                    <EachWord
                                        vocab={vocabs[currentIndex]} // 현재 단어 전달
                                    />

                                    <VoiceRecording
                                        sample={vocabs[currentIndex].english}
                                        passThreshold={passThreshold}
                                        index={currentIndex} // 현재 단어의 인덱스 전달
                                        onPassUpdate={handlePassUpdate}
                                        shouldReset={shouldReset}
                                    />

                                    <div>
                                        <button onClick={handleNext} disabled={!passResults[currentIndex]}>Next</button>
                                        <button onClick={handlePass} >Pass</button>
                                    </div>
                                </div>
                            )
                            :
                            <div>
                                <h3>{passResults.every((isPassed) => isPassed) ? "ALL PASS" : "틀린 문항 공부하러가기"}</h3>
                                <button onClick={handleSubmit} >Submit</button>
                            </div>
                    }
                </div> */}
            </div>




            <div className={styles.TEMPORARY}>
                {/* {
                    passResults.map((result,idx) => {
                        return(
                            <div key={idx}>[{idx}] {result? "true":"false"} gd</div>
                        )
                    })

                } */}
            </div>
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

function VoiceRecording({ sample, passThreshold, onPassUpdate, index, shouldReset, onScoreUpdate }) {

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

    useEffect(() => {

        resetRecorder();

    }, [shouldReset]);

    const resetRecorder = () => {
        setIsRecording(false);
        setIsPlayable(false)
        setIsSubmit(false)
        setIsEvaluated(false)
        setAudioUrl(null)
        setStream(null)
        setErrorMessage("")
        setScore(0)
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

            mediaRecorder.onstop = async () => {

                setIsSubmit(true)

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

                // const response = await fetch(apiMainPathSTS + '/GetAccuracyFromRecordedAudio', {
                //     method: "post",
                //     body: JSON.stringify({ "title": sample, "base64Audio": audioBase64, "language": "en" }),
                //     // headers: { "X-Api-Key": STScoreAPIKey }

                // })


                // if (!response.ok) {
                //     alert('fail')
                //     throw new Error("정확도 불러오기 실패")
                // }

                // const result = await response.json()

                // const score = parseFloat(result.pronunciation_accuracy)

                const score = 80;

                if (score >= passThreshold)
                    onPassUpdate(index, true)

                setIsEvaluated(true)
                setIsSubmit(false)
                setScore(score)
                onScoreUpdate(score)
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
            setIsEvaluated(false)

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
                disabled={isSubmit && !isEvaluated}
                className={styles.recordButton}
            >
                {isRecording ? "녹음 중지" : "녹음 시작"}
            </button>

            {isPlayable && (
                <div>
                    <button onClick={replayAudio}>녹음 재생</button>
                    {/* <div>
                        <audio src={audioUrl} controls />
                    </div> */}
                </div>
            )}

            <div>{errorMessage}</div>

            {
                isSubmit ? (
                    isEvaluated ? (
                        <div>{score}</div> // 평가 완료 후 점수 표시
                    ) : (
                        <div>평가 중</div> // 제출 후 평가 중
                    )
                ) : isEvaluated ? (
                    <div>{score}</div> // 평가 완료된 상태에서 제출 전
                ) : (
                    <div>제출 전</div> // 제출도 평가도 하지 않은 상태
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