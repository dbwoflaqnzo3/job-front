import style from "./exitModal.module.css"
import SizedBox from "../widgets/structure/SizedBox";

const ExitModal = ({ passResults, endVocab,  modalControll }) => {

    return (
        <div className={style.modalOverlay}>
            <div className={style.endTestModalContainer}>
                <h2>학습을 종료하시겠어요?</h2>
                <p>종료하시면 이전 단계까지 저장됩니다.</p>
                <div className={style.checkImgContainer}>
                    <img
                        className={style.testCompleteImg}
                        src={"/images/이미지_오류.png"}>
                    </img>
                </div>
                <button className={style.homeBtn} onClick={endVocab}>학습 종료하기</button>
                <button className={style.buttonCancel}  onClick={modalControll}>계속 학습하기</button>
            </div>
        </div>
    )
};

export default ExitModal;