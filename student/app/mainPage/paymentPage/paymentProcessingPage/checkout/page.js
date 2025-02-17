"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import styles from '../page.module.css';


const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export default function CheckoutPage() {
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [amount, setAmount] = useState({ currency: "KRW", value: 30000 });
    const router = useRouter();

    useEffect(() => {
        async function initPaymentWidgets() {
            const tossPayments = await loadTossPayments(clientKey);
            const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
            setWidgets(widgets);

        }
        initPaymentWidgets();
    }, []);

    useEffect(() => {
        async function renderWidgets() {
            if (!widgets) return;
            await widgets.setAmount(amount);
            await Promise.all([
                widgets.renderPaymentMethods({ selector: "#payment-method", variantKey: "DEFAULT" }),
                widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" }),
            ]);
            setReady(true);
        }
        renderWidgets();
    }, [widgets, amount]); // amount를 의존성 배열에 추가
    

    return (
        <div className={`${styles.wrapper} ${styles["w-100"]}`}>
            <div className={`${styles["max-w-540"]} ${styles["w-100"]}`}>
                <div id="payment-method" className={styles["w-100"]} />
                <div id="agreement" className={styles["w-100"]} />
                <div className={`${styles["btn-wrapper"]} ${styles["w-100"]}`}>
                    <button
                        className={`${styles.btn} ${styles.primary} ${styles["w-100"]}`}
                        onClick={async () => {
                            try {
                                await widgets?.requestPayment({
                                    orderId: generateRandomString(),
                                    orderName: "토스 티셔츠 외 2건",
                                    customerName: "김토스",
                                    customerEmail: "customer123@gmail.com",
                                    successUrl: `${window.location.origin}/mainPage/paymentPage/paymentProcessingPage/success`,
                                    failUrl: `${window.location.origin}/mainPage/paymentPage/paymentProcessingPage/fail`,
                                });
                            } catch (error) {
                                console.error("결제 오류:", error);
                            }
                        }}
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}
