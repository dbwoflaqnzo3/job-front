'use client'
import style from "../../styles/vocaMain.module.css"

import { useState, useEffect, use, useRef } from 'react';
import { readAllVocabData, readStudentLessonInfo } from "../../utils/VocabUtils"

import SpeakingTestComponent from "./stage1/speakingTest";
import SpeakingStudyComponent from "./stage1/speakingStudy";

import blockTestComponent from './stage2/blockTest';
import blockStudyComponent from './stage2/blockStudy'

import inputTestComponent from './stage3/inputTest';

export default function VocabStageController() {
    
    const [errorMessage, setErrorMessage] = useState("");
    const [vocabs, setVocabs] = useState([])
    const [totalVocabs, setTotalVocabs] = useState([])
    const [isVocabsUpdated, setIsVocabsUpdated] = useState(false); 

    const [studyMode, setStudyMode] = useState([])

    const [filteredVocabs, setFilteredVocabs] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

    const [totalProgress, setTotalProgress] = useState(1)
    const [middleProgress, setMiddleProgress] = useState(1)  // 임시로 수정 원래 1
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

                setStudyMode(resultStudentLessonInfo.studyMode)

                //테스트를 위해서 result로 잠시 변환 
                // setVocabs(updatedResult);
                setVocabs(updatedResult);
                // setTotalProgress(resultStudentLessonInfo.studyMode[0])
                setTotalProgress(2) // 임시로 2로 수정
                setIsVocabsUpdated(true)

                setTotalVocabs(resultVocabData.map(item =>({
                    korean: item.korean,
                    english: item.english
                })))

    

            } catch (err) {
                setErrorMessage(err.message); // 오류 발생 시 상태에 오류 메시지 저장
            }
        };

        fetchData();

    },[]);

    useEffect(() => {
        if (totalProgress === 1) 
        {
            if(isVocabsUpdated)
            {
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

            if(isVocabsUpdated)
                {
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
        } else {
            setComponentToRender(() => inputTestComponent); // Default Component for other cases
        }

    }, [totalProgress, middleProgress, isVocabsUpdated, isFiltered])

    const filterVocab = (totalProgress) => {
        console.log(totalProgress, "total")
        let failedVocabs = []

        for(let i = 0; i < vocabs.length; i++){
            if(!vocabs[i].IsPassed[studyMode.indexOf(totalProgress)]){
                failedVocabs.push(vocabs[i])
            }
        }// 특정 인덱스의 값이 false인 원소만 필터링

        setFilteredVocabs(failedVocabs); // 상태 업데이트

        console.log(failedVocabs, "filter failedVocabs")
        setIsFiltered(true); // 필터링 상태 업데이트
    };
    

    // passResult = { result : [결과], stage : 단계}
    const handleVocabPass = (passResults) => {
        console.log(passResults,"!!!")

        setVocabs((prevVocabs) => {

            // 해당 단계의 index 찾기
            const stageIndex = studyMode.indexOf(passResults.stage)
            console.log(stageIndex, "stageIndex")

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
                console.log(vocab, "vocab")
                return vocab;
            });

            console.log(updatedVocabs, "updatedVoca")
            return updatedVocabs;
        });

        setIsVocabsUpdated(true);

        let stagePassed = true
        for(let i = 0; i < passResults.result.length; i++){
            console.log(studyMode.indexOf(passResults.stage), "index of")
            stagePassed = stagePassed && passResults.result[i]
        }

        console.log(stagePassed, "11")

        if(stagePassed)
        {
            setTotalProgress(studyMode[studyMode.indexOf(passResults.stage) + 1])
            setMiddleProgress(1)
            return
        }
        
        setMiddleProgress(middleProgress == 1? 2:1)


    };
    
    const handleStage3VocabPass = (passResults) => {
        //여기에 단어 맞추기 파트 코드작성 

    };


    return (
        <div>
            {
                vocabs.length !== 0 ? (
                    ComponentToRender ? (
                        <ComponentToRender
                            totalVocabs={totalVocabs}
                            vocabs={filteredVocabs}
                            onTestComplete={(passResults) => handleVocabPass(passResults)}
                        />
                    ) : (
                        <div>Loading...</div> // vocabs 데이터가 로드되기 전에 표시되는 로딩 상태
                    )
                ) : (
                    <div>Loading...</div> // vocabs가 로드되지 않았다면 로딩 표시
                )
            }
    
            {/* {vocabs.length !== 0 && vocabs.map((vocab, index) => (
                <div key={index} className="vocab-item">
                    <p>[{vocab.sequence}] English: {vocab.english}  | Korean: {vocab.korean} | IsPassed: {JSON.stringify(vocab.IsPassed)}</p>
                </div>
            ))} */}
    
            {errorMessage && <div>Error: {errorMessage}</div>}
        </div>
    );
}
