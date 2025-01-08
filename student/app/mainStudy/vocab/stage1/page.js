'use client'

import { useState, useEffect, use } from 'react';
import { readAllVocabData } from "../../../utils/VocabUtils"

import SpeakingTestComponent from "./speakingTest";
import SpeakingStudyComponent from "./speakingStudy";

export default function VocabStage1() {
    
    const [errorMessage, setErrorMessage] = useState("");
    const [vocabs, setVocabs] = useState([])
    const [isVocabsUpdated, setIsVocabsUpdated] = useState(true); 

    const [filteredVocabs, setFilteredVocabs] = useState([])

    const[totalProgress, setTotalProgress] = useState(1)
    const [speakingProgress, setSpeakingProgress] = useState(1)
    const [ComponentToRender, setComponentToRender] = useState(null);


    useEffect(() => {

        const fetchData = async () => {
            try {
                
                const result = await readAllVocabData("677a5441885dd37493ef1f17","677a6b62198c43f34b683ecc")

                const updatedResult = result.map(item => ({
                    ...item, // 기존 객체 복사
                    IsPassed: false, // 새 속성 추가
                }));

                setVocabs(updatedResult);
                
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

                if (speakingProgress === 1) {        
                    setComponentToRender(() => SpeakingTestComponent); // Test Component
                    setIsVocabsUpdated(false);
                } else if (speakingProgress === 2) {
                    setComponentToRender(() => SpeakingStudyComponent); // Study Component
                    setIsVocabsUpdated(false);
                }
                else
                    setComponentToRender(() => () => <div>Speaking Complete</div>);
            }
            
        } else if (totalProgress === 2) {
            setComponentToRender(() => () => <div>Default Component</div>); // Default Component for Progress 2
        } else {
            setComponentToRender(() => () => <div>Default Component</div>); // Default Component for other cases
        }

    }, [totalProgress, speakingProgress, isVocabsUpdated])

    const filterVocab = () => {
        const failedVocabs = vocabs.filter((item) => !item.IsPassed); // IsPassed가 false인 원소만 필터링
        setFilteredVocabs(failedVocabs) // 상태 업데이트
    }

    const handleVocabPass = (passResults) => {
        setVocabs((prevResults) => {
            // 이전 결과를 복사하여 업데이트
            const updatedResults = [...prevResults];
            passResults.forEach((isPassed, index) => {
                updatedResults[index].isPassed = isPassed; // 각 단어의 통과 여부 업데이트
            });
            return updatedResults;
        });


        setIsVocabsUpdated(true);

        const speakingPassed = passResults.every((isPassed) => isPassed);

        if(!speakingPassed)
            setSpeakingProgress(speakingProgress == 1? 2:1)
        else
            setSpeakingProgress(3)
    };
    
    return (
        <div>

            {
                ComponentToRender && vocabs.length != 0 ? (
                    <ComponentToRender
                    vocabs = {vocabs}
                    onTestComplete={(passResults) => handleVocabPass(passResults)}
                    />
                ) : (
                    <div>Loading...</div> // 로딩 상태 표시
                )
            }
            
            {
                vocabs.map((vocab, index) => {
                    return (
                    <div key={index} className="vocab-item">
                        <p>[{vocab.sequence}] English: {vocab.english}  | Korean: {vocab.korean} | IsPassed: {vocab.IsPassed ? "True" : "False"}</p>
                    </div>
                    );
                })
            }
            <div>Error: {errorMessage}</div>
        </div>
    );
}
