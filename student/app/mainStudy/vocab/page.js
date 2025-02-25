'use client'
import style from "../../styles/vocaMain.module.css"
import ExitModal from "@/app/utils/exitModal";
import IntroBox from "@/app/utils/introBox";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { readAllVocabData, readStudentLessonInfo } from "../../utils/VocabUtils"
import { createProgress, updateProgress, readProgress } from "@/app/utils/progressUtils";

import SpeakingTestComponent from "./stage1/speakingTest";
import SpeakingStudyComponent from "./stage1/speakingStudy";

import blockTestComponent from './stage2/blockTest';
import blockStudyComponent from './stage2/blockStudy'

import blockStudyKorComponent from './stage3/blockStudyKor';
import blockTestKorComponent from './stage3/blockTestKor';

import spellStudy from './stage4/spellStudy';
import twoSpellTestComponent from './stage4/twoSpellTest'

import inputTestComponent from './stage5/inputTest';
import inputStudyComponent from './stage5/inputStudy';

export default function VocabStageController() {

    const router = useRouter()

    const [errorMessage, setErrorMessage] = useState("");
    const [vocabs, setVocabs] = useState([])
    const [totalVocabs, setTotalVocabs] = useState([])
    const [isVocabsUpdated, setIsVocabsUpdated] = useState(false);
    const progressId = useRef(null) //생성된 progressId 저장

    const [studyMode, setStudyMode] = useState([])

    const [filteredVocabs, setFilteredVocabs] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

    const [totalProgress, setTotalProgress] = useState(1)
    const [middleProgress, setMiddleProgress] = useState(1)
    const [ComponentToRender, setComponentToRender] = useState(null);

    const studyModeHeader = ["1단계 - 단어 말하기", "2단계 - 뜻 찾기", "3단계 - 영단어 찾기", "4단계 = 2글자 영작하기", "5단계 - 영작하기"]
    const test_study = ["테스트", "학습"]

    const [width, setWidth] = useState(1512)
    const [exitModalOpen, setExitModalOpen] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            try {

                const resultReadProgress = await readProgress("67b6d860eedb37efe41c0b2a") // 현재 학습 상태 불러오기
                const resultStudentLessonInfo = await readStudentLessonInfo("6797ab3555927d2b753da5d8") //studyMode 불러오기
                const resultVocabData = await readAllVocabData("67744a3cdb036043fdd85d47") //학습할 단어 불러오기

                // const resultCreateProgress = await createProgress("6797ab3555927d2b753da5d8") // progrss 생성 (수정 요망)
                progressId.current = "67b6d860eedb37efe41c0b2a" //progress id 저장

                const updatedResult = resultVocabData.map(item => ({
                    ...item, // 기존 객체 복사
                    IsPassed: Array(resultStudentLessonInfo.studyMode.length).fill(false), // studyMode 크기에 맞는 false 배열 생성
                }));

                // setStudyMode(resultStudentLessonInfo.studyMode)
                setStudyMode([0,1,2,3,4])

                //테스트를 위해서 result로 잠시 변환 
                setVocabs(updatedResult);

                // setTotalProgress(resultReadProgress.progressLevel)
                setTotalProgress(1)

                setIsVocabsUpdated(true)

                setTotalVocabs(resultVocabData.map(item => ({
                    korean: item.korean,
                    english: item.english
                })))



            } catch (err) {
                setErrorMessage(err.message); // 오류 발생 시 상태에 오류 메시지 저장
            }
        };

        fetchData();


        // 1512px 보다 작은 width 조정 
        const handleResize = () => {
            if (window.innerWidth >= 756 && window.innerWidth < 1512) {
                setWidth(window.innerWidth)
            } else if (window.innerWidth < 756) {
                setWidth(756)
            } else {
                setWidth(1512)
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        console.log(width, "width")

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (totalProgress === 1) {
            if (isVocabsUpdated) {
                filterVocab(totalProgress)

                if (middleProgress === 1 && isFiltered) {
                    setComponentToRender(() => SpeakingTestComponent); // Test Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                } else if (middleProgress === 2 && isFiltered) {

                    setComponentToRender(() => SpeakingStudyComponent); // Study Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                }
                else
                    setComponentToRender(() => () => <div>Speaking Complete</div>);
            }

        } else if (totalProgress === 2) {

            if (isVocabsUpdated) {
                filterVocab(totalProgress)

                if (middleProgress === 1 && isFiltered) {
                    setComponentToRender(() => blockTestComponent); // Test Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                } else if (middleProgress === 2 && isFiltered) {
                    setComponentToRender(() => blockStudyComponent); // Study Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                }
                else
                    setComponentToRender(() => () => <div>Block Test Complete</div>);
            }

        } else if (totalProgress === 3) {

            if (isVocabsUpdated) {
                filterVocab(totalProgress)

                if (middleProgress === 1 && isFiltered) {
                    setComponentToRender(() => blockTestKorComponent); // Test Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                } else if (middleProgress === 2 && isFiltered) {
                    setComponentToRender(() => blockStudyKorComponent); // Study Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                }
                else
                    setComponentToRender(() => () => <div>Block Test Complete</div>);
            }
        } else if (totalProgress === 4) {

            if (isVocabsUpdated) {
                filterVocab(totalProgress)

                if (middleProgress === 1 && isFiltered) {
                    setComponentToRender(() => twoSpellTestComponent); // Test Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                } else if (middleProgress === 2 && isFiltered) {
                    setComponentToRender(() => spellStudy); // Study Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                }
                else
                    setComponentToRender(() => () => <div>Block Test Complete</div>);
            }
        } else if (totalProgress === 5) {

            if (isVocabsUpdated) {
                filterVocab(totalProgress)

                if (middleProgress === 1 && isFiltered) {
                    setComponentToRender(() => inputTestComponent); // Test Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                } else if (middleProgress === 2 && isFiltered) {
                    setComponentToRender(() => inputStudyComponent); // Study Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                }
                else
                    setComponentToRender(() => () => <div>Block Test Complete</div>);
            }

        }
        else {
            setComponentToRender(() => () => <div>Default Component</div>); // Default Component for Progress 2 
        }
    }, [totalProgress, middleProgress, isVocabsUpdated, isFiltered])

    const filterVocab = (totalProgress) => {
        let failedVocabs = []

        for (let i = 0; i < vocabs.length; i++) {
            if (!vocabs[i].IsPassed[studyMode.indexOf(totalProgress)]) {
                failedVocabs.push(vocabs[i])
            }
        }// 특정 인덱스의 값이 false인 원소만 필터링

        setFilteredVocabs(failedVocabs); // 상태 업데이트

        setIsFiltered(true); // 필터링 상태 업데이트
    };


    const handleVocabPass = (passResults) => {

        setVocabs((prevVocabs) => {

            // 해당 단계의 index 찾기
            const stageIndex = studyMode.indexOf(passResults.stage)
            // 새 배열 생성
            const updatedVocabs = prevVocabs.map((vocab) => {
                // filteredVocabs에서 해당 sequence와 일치하는 항목의 index를 찾기
                const indexInFiltered = filteredVocabs.findIndex(
                    (filteredVocab) => filteredVocab.sequence === vocab.sequence
                );

                // indexInFiltered가 유효한 경우 passResults 값을 isPassed로 설정
                let updateIsPassed = [...vocab.IsPassed]

                updateIsPassed[stageIndex] = passResults.result[indexInFiltered]

                if (indexInFiltered !== -1) {
                    return {
                        ...vocab,
                        IsPassed: updateIsPassed,
                    };
                }

                // 일치하는 항목이 없으면 기존 vocab 반환
                return vocab;
            });

            return updatedVocabs;
        });

        setIsVocabsUpdated(true);

        let stagePassed = true
        for (let i = 0; i < passResults.result.length; i++) {
            console.log(studyMode.indexOf(passResults.stage), "index of")
            stagePassed = stagePassed && passResults.result[i]
        }

        console.log(passResults)

        if (stagePassed) {
            setTotalProgress(studyMode[studyMode.indexOf(passResults.stage) + 1])
            setMiddleProgress(1)
            return
        }

        setMiddleProgress(middleProgress == 1 ? 2 : 1)

    };

    const handleExit = async () => {
        const type = 0
        const result = await updateProgress(progressId.current, type, totalProgress) //중간 종료 시 progress 업데이트 시킴
        console.log(result, "dsfd")
        router.push("../mainPage")
    }

    return (
        <div>
            {
                vocabs.length !== 0 ? (
                    ComponentToRender ?
                        (
                            <div className={style.bodyContainer}>
                                <div className={style.progressContainer} style={{ width: width, height: "10.68%" }}>
                                    <SizedBox width={"3.968%"} />
                                    <div className={style.exitButtonContainer}>
                                        <img
                                            src="/icons/exitButton.svg"
                                            className={style.exitButton}
                                            onClick={() => setExitModalOpen(true)}
                                        />
                                    </div>
                                    <div className={style.progressBarContainer}>
                                        <h2>Vocabulary / 교재이름 - Unit 7</h2>
                                        <p>{test_study[middleProgress - 1]} {studyModeHeader[totalProgress - 1]}</p>
                                        <SizedBox height="22.86%" />
                                        <div className={style.progressBar}>
                                            {
                                                studyMode.map((a, i) => {
                                                    return (
                                                        <div key={i} className={style.progressElement}>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <SizedBox width={"19.57%"} />

                                </div>
                                <ComponentToRender
                                    totalVocabs={totalVocabs}
                                    vocabs={filteredVocabs}
                                    onTestComplete={(passResults) => handleVocabPass(passResults)}
                                />
                            </div>
                        ) : (
                            <div>Loading...</div> // vocabs 데이터가 로드되기 전에 표시되는 로딩 상태
                        )
                ) : (
                    // <div>Loading...</div> // vocabs가 로드되지 않았다면 로딩 표시

                    <IntroBox
                        testOrStudy={test_study[middleProgress - 1]}
                        progressStatus={studyModeHeader[totalProgress - 1]}
                    />
                )
            }

            {errorMessage && <div>Error: {errorMessage}</div>}

            {/* 질문하기 버튼 */}
            <a className={style.questionButtonContainer} href="https://open.kakao.com/o/sOgvRb7g" target="_blank" rel="noopener noreferrer">
                <img
                    src="/icons/질문하기.svg"
                    className={style.questionIcon}
                />
                <p>질문하기</p>
            </a>

            {/* 진행중인 학습 종료하기 modal */}
            {
                exitModalOpen &&
                <ExitModal
                    passResults={null}
                    endVocab={handleExit}
                    modalControll={() => setExitModalOpen(false)}
                />
            }
        </div>
    );
}


function SizedBox({ width, height, children }) {
    return <div style={{ width, height }}>{children}</div>;
}