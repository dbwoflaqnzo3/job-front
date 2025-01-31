'use client'

import style from "../../../styles/vocaStage2.module.css"
import { useState } from "react"

export default function BlockStudy({vocabs, onTestComplete}){

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 단어 인덱스

    return (
        <div className={style.wrapper}>

            <div className={style.progressBar}>
                Progress Bar
            </div>

            {/* <button>
                나가기 버튼 제작
            </button> */}

            <div className={style.containerHead1}>
                <p className={style.head1}>
                    단어 카드를 클릭하여 한글 뜻을 확인해보세요
                </p>
            </div>


            {/* study content */}
            <div className={style.contentContainer}>

                {/* Vocab List */}
                <div className={style.vocabListBox}>
                    <p className={style.vocabInstruction}>단어리스트</p>
                    <div className={style.vocabList}>
                        <ol className={style.vocabOl}>
                            {vocabs.korean}
                        </ol>
                    </div>
                </div>
                            
                <div className={style.wordCardContainer}>
                    <div className={style.timerContainer}>
                    </div>
                    <div>
                        <p className={style.currentVoca}>{vocabs[currentIndex].english}</p> {/*현재 단어 전달*/}
                    </div>
                </div>
                <div>
                    시간 선택
                </div>
            </div>

        </div>
    );
}