import style from "../styles/vocaStage2.module.css"
import { useRouter } from 'next/navigation'
import { deleteProgress } from "./progressUtils";

const EndVocabMode = ({ progressId }) => {

    const router = useRouter()

    const handleSubmit = async () => {
        await deleteProgress(progressId)
        router.push("../mainPage")
    }

    return (
        <div className={style.modalOverlay}>
            <div className={style.endTestModalContainer}>
                <p className={style.endTestModalHeaderText}>Vocabulary 학습 완료!</p>
                <div className={style.countTextContainer}>
                    모든 학습 단계를 완료했습니다!<br></br>버튼을 눌러 다음 학습으로 넘어가 주세요
                </div>
                <div className={style.checkImgContainer}>
                    <img
                        className={style.testCompleteImg}
                        src={"/images/testComplete.png"}>
                    </img>
                </div>
                <button className={style.homeBtn} onClick={handleSubmit}>다른 학습하러 가기</button>
            </div>
        </div>
    );
};

export default EndVocabMode;