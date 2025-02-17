"use client";

import { useSearchParams } from "next/navigation";
import styles from '../page.module.css';

export default function FailPage() {
    const searchParams = useSearchParams();
    const errorCode = searchParams.get("code");
    const errorMessage = searchParams.get("message");

    return (
        <div className={`${styles.wrapper} ${styles["w-100"]}`}>
            <div className={`${styles["flex-column"]} ${styles["align-center"]} ${styles["w-100"]} ${styles["max-w-540"]}`}>
                <img src="https://static.toss.im/lotties/error-spot-apng.png" width="120" height="120" alt="결제 실패" />
                <h2 className={styles.title}>결제를 실패했어요</h2>
                
                <div className={`${styles["response-section"]} ${styles["w-100"]}`}>
                    <div className={`${styles.flex} ${styles["justify-between"]}`}>
                        <span className={styles["response-label"]}>code</span>
                        <span className={styles["response-text"]}>{errorCode}</span>
                    </div>
                    <div className={`${styles.flex} ${styles["justify-between"]}`}>
                        <span className={styles["response-label"]}>message</span>
                        <span className={styles["response-text"]}>{errorMessage}</span>
                    </div>
                </div>
                
                <div className={styles["button-group"]}>
                    <button
                        className={styles.btn}
                        onClick={() => window.location.href = `${window.location.origin}/mainPage/paymentPage`}
                    >
                        다시 테스트하기
                    </button>
                </div>
            </div>
        </div>
    );
}
