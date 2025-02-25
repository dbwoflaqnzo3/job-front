import style from "../utils/introBox.module.css"
import SizedBox from "../widgets/structure/SizedBox"

const IntroBox = ({ testOrStudy, progressStatus }) => {
    return (
        <div className={style.introContainer}>
        
            <div className={style.exitButtonContainer}>
                <img
                    src="/icons/exitButton.svg"
                    className={style.exitButton}
                    onClick={() => setExitModalOpen(true)}
                >
                </img>
            </div>
            <div className={style.introInfoContainer}>
                <h1>Vocabulary</h1>
                <p>{testOrStudy}<br />{progressStatus}</p>
                <h2>12/31</h2>
            </div>
            <SizedBox height="15.47%" />
            <button className={style.studyStartButton}>학습 시작하기</button>
        </div>
    )
}

export default IntroBox