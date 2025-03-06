import style from "../styles/vocaStage2.module.css"

const CheckAnswerModal = ({ isPassed }) => {
    return (
        <div className={style.modalOverlay}>
            <div className={style.imgBackgroundContainer}>
                <img
                    className={style.ImgModalContainer}
                    src={isPassed ? "/icons/answer.svg" : "/icons/wrongAnswer.svg"}>
                </img>
            </div>
        </div>
    )
}

export default CheckAnswerModal;