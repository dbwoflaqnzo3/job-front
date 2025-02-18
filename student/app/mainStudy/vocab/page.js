'use client'
import style from "../../styles/vocaMain.module.css"

import { useState, useEffect } from 'react';
import { readAllVocabData, readStudentLessonInfo } from "../../utils/VocabUtils"

import SpeakingTestComponent from "./stage1/speakingTest";
import SpeakingStudyComponent from "./stage1/speakingStudy";

import blockTestComponent from './stage2/blockTest';
import blockStudyComponent from './stage2/blockStudy'

// import inputTestComponent from './stage3/inputTest';

import spellStudy from './stage4/spellStudy';
import twoSpellTestComponent from './stage4/twoSpellTest'

import inputTestComponent from './stage5/inputTest';
import inputStudyComponent from './stage5/inputStudy';

export default function VocabStageController() {

    const [errorMessage, setErrorMessage] = useState("");
    const [vocabs, setVocabs] = useState([])
    const [totalVocabs, setTotalVocabs] = useState([])
    const [isVocabsUpdated, setIsVocabsUpdated] = useState(false);

    const [studyMode, setStudyMode] = useState([])

    const [filteredVocabs, setFilteredVocabs] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

    const [totalProgress, setTotalProgress] = useState(1)
    const [middleProgress, setMiddleProgress] = useState(1)
    const [ComponentToRender, setComponentToRender] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const resultStudentLessonInfo = await readStudentLessonInfo("6797ab3555927d2b753da5d8")

                const resultVocabData = await readAllVocabData("67744a3cdb036043fdd85d47")


                const updatedResult = resultVocabData.map(item => ({
                    ...item, // 기존 객체 복사
                    IsPassed: Array(resultStudentLessonInfo.studyMode.length).fill(false), // studyMode 크기에 맞는 false 배열 생성
                }));

                // setStudyMode(resultStudentLessonInfo.studyMode)
                setStudyMode([1,2,4,5])

                //테스트를 위해서 result로 잠시 변환 
                setVocabs(updatedResult);

                // setTotalProgress(resultStudentLessonInfo.studyMode[0])
                setTotalProgress(5)
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
        } else if (totalProgress === 3){
            setComponentToRender(() => () => <div>Default Component</div>);
        } else if (totalProgress === 4){ 

            if(isVocabsUpdated){
                filterVocab(totalProgress)

                if (middleProgress === 1 && isFiltered){
                    setComponentToRender(() => twoSpellTestComponent); // Test Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                } else if (middleProgress === 2 && isFiltered){
                    setComponentToRender(() => spellStudy); // Study Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                }
                else
                    setComponentToRender(() => () => <div>Block Test Complete</div>);
            }
        } else if(totalProgress === 5){
            if(isVocabsUpdated){
                filterVocab()

                if (middleProgress === 1 && isFiltered){
                    setComponentToRender(() => inputTestComponent); // Test Component
                    setIsVocabsUpdated(false);
                    setIsFiltered(false)
                } else if (middleProgress === 2 && isFiltered){
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

        console.log(stagePassed, "11")

        if (stagePassed) {
            setTotalProgress(studyMode[studyMode.indexOf(passResults.stage) + 1])
            setMiddleProgress(1)
            return
        }

        setMiddleProgress(middleProgress == 1 ? 2 : 1)

    };
    
    return (
        <div>
            {
                vocabs.length !== 0 ? (
                    ComponentToRender ?

                        (
                            <div className={style.bodyContainer}>
                                <div className={style.progressContainer}>
                                    <div className={style.exitButtonContainer}>
                                        <img 
                                            src="/icons/exitButton.svg" 
                                            className={style.exitButton}
                                        >
                                        </img>
                                    </div>
                                    <div className={style.progressBar}></div>
                                    <div className={style.progressStatusContainer}>
                                        <p className={style.progressStatus}>2/13</p>
                                    </div>
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
                    <div>Loading...</div> // vocabs가 로드되지 않았다면 로딩 표시
                )
            }
            {errorMessage && <div>Error: {errorMessage}</div>}
        </div>
    );
}
