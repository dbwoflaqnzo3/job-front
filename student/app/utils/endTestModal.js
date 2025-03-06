import style from "../styles/vocaStage2.module.css"

const EndTestModal = ({ passResults, handleSubmit }) => {
    
    const correctAnswer = passResults.filter(a => a === true).length;
    const wrongAnswer = passResults.length - correctAnswer

    return (
        <div className={style.modalOverlay}>
            <div className={style.endTestModalContainer}>
                <p className={style.endTestModalHeaderText}>Vocabulary 테스트 완료</p>
                <div className={style.countTextContainer}>
                    맞은 문제 수: {correctAnswer}개<br />틀린 문제 수: {wrongAnswer}개
                </div>
                <div className={style.checkImgContainer}>
                    <img
                        className={style.testCompleteImg}
                        src={"/images/testComplete.png"}>
                    </img>
                </div>
                {
                    wrongAnswer === 0 ?
                        <button className={style.homeBtn} onClick={handleSubmit}>다음으로</button>
                        :
                        <button className={style.homeBtn} onClick={handleSubmit}>틀린 단어 학습하러 가기</button>
                }
            </div>
        </div>
    );
};

export default EndTestModal;