"use client";

import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import styles from './page.module.css';

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export default function PaymentWidget() {
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [amount, setAmount] = useState({
        currency: "KRW",
        value: 50_000,
    });

    useEffect(() => {
        async function fetchPaymentWidgets() {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
        setWidgets(widgets);
        }

        fetchPaymentWidgets();
    }, []);

    useEffect(() => {
        async function renderPaymentWidgets() {
        if (!widgets) return;

        await widgets.setAmount(amount);

        await Promise.all([
            widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
            }),
            widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
            }),
        ]);

        setReady(true);
        }

        renderPaymentWidgets();
    }, [widgets]);

    return (
        <div className={`${styles["max-w-540"]} ${styles["w-100"]}`}>
            <div id="payment-method" className={styles["w-100"]} />
            <div id="agreement" className={styles["w-100"]} />
            <div className={styles["btn-wrapper"]}>
                <button
                    className={`${styles["btn"]} ${styles["primary"]} ${styles["w-100"]}`}
                    onClick={async () => {
                        try {
                            await widgets?.requestPayment({
                                orderId: generateRandomString(),
                                orderName: "토스 티셔츠 외 2건",
                                customerName: "김토스",
                                customerEmail: "customer123@gmail.com",
                                successUrl: `${window.location.origin}/mainPage/paymentPage/success`,
                                failUrl: `${window.location.origin}/mainPage/paymentPage/fail`,
                            });
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    결제하기
                </button>
            </div>
        </div>
    );
}
