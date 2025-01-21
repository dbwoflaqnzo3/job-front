'use client'
// import style from "../../public/styles/vocaMain.module.css"

import { useState, useEffect, use, useRef } from 'react';
import { readAllVocabData, readStudentLessonInfo } from "../../utils/VocabUtils"

import SpeakingTestComponent from "./stage1/speakingTest";
import SpeakingStudyComponent from "./stage1/speakingStudy";

import blockTestComponent from './stage2/blockTest';
import inputTestComponent from './stage5/inputTest';

export default function VocabStageController() {
    
    const [errorMessage, setErrorMessage] = useState("");
    const [vocabs, setVocabs] = useState([])
    const [isVocabsUpdated, setIsVocabsUpdated] = useState(false); 

    const [studyMode, setStudyMode] = useState([])

    const [filteredVocabs, setFilteredVocabs] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

    const[totalProgress, setTotalProgress] = useState(5)
    const [middleProgress, setMiddleProgress] = useState(1)
    const [ComponentToRender, setComponentToRender] = useState(null);


    useEffect(() => {

        const fetchData = async () => {
            try {
                // const resultStudentLessonInfo = await readStudentLessonInfo("678b391a7e259583d29aed48")
                
                const resultVocabData = await readAllVocabData("677a5441885dd37493ef1f17")
                

                // const updatedResult = resultVocabData.map(item => ({
                //     ...item, // 기존 객체 복사
                //     IsPassed: Array(resultStudentLessonInfo.studyMode.length).fill(false), // studyMode 크기에 맞는 false 배열 생성
                // }));
                const tempStudyMode = Array([1,2,4,5])
                

                setStudyMode(tempStudyMode)

                //테스트를 위해서 result로 잠시 변환 
                // setVocabs(updatedResult);
                setVocabs(resultVocabData);
                setTotalProgress(tempStudyMode[3])
                setIsVocabsUpdated(true)
                

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
                filterVocab()

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
            setComponentToRender(() => () => <div>Default Component</div>); // Default Component for Progress 2 
        } else if (totalProgress === 3){
            setComponentToRender(() => () => <div>Default Component</div>);
        } else if (totalProgress === 4){
            setComponentToRender(() => () => <div>Default Component</div>);
        }
        else (totalProgress === 5)
        {
            setComponentToRender(() => inputTestComponent); // Default Component for other cases
        }

    }, [totalProgress, middleProgress, isVocabsUpdated, isFiltered])

    const filterVocab = (totalProgress) => {
        const failedVocabs = vocabs.filter((item) => !item.IsPassed[totalProgress-1]); // 특정 인덱스의 값이 false인 원소만 필터링
        setFilteredVocabs(failedVocabs); // 상태 업데이트
    
        setIsFiltered(true); // 필터링 상태 업데이트
    };
    

    // passResult = { result : [결과], stage : 단계}
    const handleVocabPass = (passResults) => {
        console.log(passResults,"!!!")

        setVocabs((prevVocabs) => {

            // 해당 단계의 index 찾기
            const stageIndex = studyMode.findIndex(passResults.stage)

            // 새 배열 생성
            const updatedVocabs = prevVocabs.map((vocab) => {
                // filteredVocabs에서 해당 sequence와 일치하는 항목의 index를 찾기
                const indexInFiltered = filteredVocabs.findIndex(
                    (filteredVocab) => filteredVocab.sequence === vocab.sequence
                );
        
                // indexInFiltered가 유효한 경우 passResults 값을 isPassed로 설정
                let updateIsPassed = [...vocab.isPassed]

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

        const stagePassed = passResults.result.every((isPassed) => isPassed);

        if(stagePassed)
        {
            setTotalProgress(studyMode.findIndex(passResults.stage) + 1)
            setMiddleProgress(1)
        }
        
        setMiddleProgress(middleProgress == 1? 2:1)


    };
    
    return (
        <div>
            {
                vocabs.length !== 0 ? (
                    ComponentToRender ? (
                        <ComponentToRender
                            // className={style.contents}
                            filteredVocab={filteredVocabs}
                            vocabs={vocabs}
                            onTestComplete={(passResults) => handleVocabPass(passResults)}
                        />
                    ) : (
                        <div>Loading...</div> // vocabs 데이터가 로드되기 전에 표시되는 로딩 상태
                    )
                ) : (
                    <div>Loading...</div> // vocabs가 로드되지 않았다면 로딩 표시
                )
            }
    
            {vocabs.length !== 0 && vocabs.map((vocab, index) => (
                <div key={index} className="vocab-item">
                    <p>[{vocab.sequence}] English: {vocab.english}  | Korean: {vocab.korean} | IsPassed: {JSON.stringify(vocab.IsPassed)}</p>
                </div>
            ))}
    
            {errorMessage && <div>Error: {errorMessage}</div>}
        </div>
    );
}
