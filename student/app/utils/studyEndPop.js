'use client';
import styles from '../public/styles/studyEndPop.module.css'; // 스타일을 별도의 파일로 관리
import { useRouter } from 'next/navigation';

export default function TestEndPopup({ correctCount, totalCount, onClose }) {
    const router = useRouter();

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                <h2>Vocabulary 테스트 완료</h2>
                <p>맞은 문제 수: {correctCount}개</p>
                <p>틀린 문제 수: {totalCount - correctCount}개</p>
                <div className={styles.iconWrapper}>
                    <div className={styles.checkIcon}></div>
                </div>
                <div className={styles.buttonWrapper}>
                    <button 
                        className={styles.homeButton} 
                        onClick={() => router.push('/')}
                    >
                        홈으로
                    </button>
                </div>
            </div>
        </div>
    );
}
