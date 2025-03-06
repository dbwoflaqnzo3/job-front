"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isConfirmed, setIsConfirmed] = useState(false);

    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const [paymentIds, setPaymentIds] = useState(null);
    const [initialSettingDone, setInitialSettingDone] = useState(false)

    useEffect(() => {
        const storedPaymentIds = localStorage.getItem('paymentIds');
        if (storedPaymentIds) {
            setPaymentIds(JSON.parse(storedPaymentIds)); // 클라이언트에서만 실행
            setInitialSettingDone(true)
        }
    }, []);

    useEffect(() => {
        if (!paymentKey || !orderId || !amount ) {
            alert("결제 정보가 없습니다.");
            router.push("/mainPage/paymentPage?tab=paymentPendingPage");
        }
    }, [paymentKey, orderId, amount, router]);

    async function confirmPayment() {
        console.log(paymentKey, orderId, amount, paymentIds)



        const response = await fetch("http://localhost:8080/payment/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentIds, paymentKey, orderId, amount }),
        });

        if (response.ok) {
            setIsConfirmed(true);
            const temp_result = await response.json();
            const result = temp_result.message

            console.log(result, temp_result)
        }
    }




    return (
        <div className={styles.wrapper}>
            {isConfirmed ? (
                <div className={`${styles["flex-column"]} ${styles["align-center"]} ${styles["confirm-success"]} ${styles["w-100"]} ${styles["max-w-540"]}`} style={{ display: "flex" }}>
                    <img
                        src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
                        width="120"
                        height="120"
                        alt="결제 완료 이미지"
                    />
                    <h2 className={styles.title}>결제를 완료했어요</h2>
                    <div className={`${styles["response-section"]} ${styles["w-100"]}`}>
                        <div className={`${styles.flex} ${styles["justify-between"]}`}>
                            <span className={styles["response-label"]}>결제 금액</span>
                            <span className={styles["response-text"]}>{amount}</span>
                        </div>
                        <div className={`${styles.flex} ${styles["justify-between"]}`}>
                            <span className={styles["response-label"]}>주문번호</span>
                            <span className={styles["response-text"]}>{orderId}</span>
                        </div>
                        <div className={`${styles.flex} ${styles["justify-between"]}`}>
                            <span className={styles["response-label"]}>paymentKey</span>
                            <span className={styles["response-text"]}>{paymentKey}</span>
                        </div>
                    </div>

                    <div className={styles["button-group"]}>
                        <div className={styles.flex} style={{ gap: "16px" }}>
                            <button
                                className={styles.btn}
                                onClick={() => router.push("/mainPage/paymentPage?tab=paymentPendingPage")}
                            >
                                다시 테스트하기
                            </button>

                            <a
                                className={styles.btn}
                                href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                결제 연동 문서가기
                            </a>
                        </div>
                    </div>

                </div>
            ) : (
                <div className={`${styles["flex-column"]} ${styles["align-center"]} ${styles["confirm-loading"]} ${styles["w-100"]} ${styles["max-w-540"]}`}>
                    <h2 className={styles.title}>결제 요청까지 성공했어요.</h2>
                    <h4 className={styles.description}>결제 승인하고 완료해보세요.</h4>
                    <button className={`${styles.btn} ${styles.primary} ${styles["w-100"]}`} onClick={confirmPayment} disabled={!initialSettingDone}>
                        결제 승인하기
                    </button>
                </div>
            )}
        </div>
    );
}
