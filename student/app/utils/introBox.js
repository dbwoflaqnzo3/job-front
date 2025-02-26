import style from "../utils/introBox.module.css"
import SizedBox from "../widgets/structure/SizedBox"

const IntroBox = ({ header, content, totalProgress, handleExitModal, loadProgress }) => {
    return (
        <div className={style.introContainer}>

            <div className={style.exitButtonContainer}>
                <img
                    src="/icons/exitButton.svg"
                    className={style.exitButton}
                    onClick={() => handleExitModal()}
                >
                </img>
            </div>
            {
                totalProgress === 0 ?
                    <div className={style.introInfoContainer}>
                        <h1>Vocabulary</h1>
                        <p>{header}<br />{content}</p>
                        <h3>12/31</h3>
                    </div>
                    :
                    <div className={style.introInfoContainer}>
                        <h1>Vocabulary</h1>
                        <h2>{totalProgress}단계</h2>
                        <h3>{header}</h3>
                    </div>
            }
            <SizedBox height="15.47%" />
            <button
                className={style.studyStartButton}
                onClick={() => loadProgress()}
            >
                학습 시작하기
            </button>
        </div>
    )
}

export default IntroBox