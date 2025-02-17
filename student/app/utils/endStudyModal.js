import style from "../styles/vocaStage2.module.css"

const EndStudyModal = ({ passResults, onTestComplete, modalControll }) => {

    return (
        <div className={style.modalOverlay}>
            <div className={style.endTestModalContainer}>
                <p className={style.endTestModalHeaderText}>Vocabulary 학습 완료</p>
                <div className={style.checkImgContainer}>
                    <img
                        className={style.testCompleteImg}
                        src={"/images/testComplete.png"}>
                    </img>
                </div>
                <button className={style.homeBtn} onClick={() => onTestComplete({result: passResults, stage: 2})}>테스트 하러 가기</button>
                <button className={style.buttonCancel} onClick={modalControll}>계속 학습하기</button>
            </div>
        </div>
    )
};

export default EndStudyModal;