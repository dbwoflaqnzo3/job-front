"use client";

import { use, useEffect, useRef, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { getUserInfo } from '@/app/utils/paymentUtil';
import styles from './page.module.css';

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export default function PaymentWidget() {
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [amount, setAmount] = useState({
        currency: "KRW",
        value: 20000000,
    });
    const [userInfo, setUserInfo] = useState(null)
    const [orederName, setOrderName] = useState(null)

    const [initialSettingDone, setInitialSettingDone] = useState(false)
    let cnt = 0

    useEffect(() => {
        
        async function fetchPaymentWidgets() {
            const userData = await getUserInfo()
            const totalAmount = JSON.parse(localStorage.getItem('totalAmount'));
            const itemsText = localStorage.getItem('itemsText'); // 문자열 불러오기
            const numericAmount = Number(totalAmount.replace(/,/g, ''));

            setUserInfo(userData)
            setAmount(prevAmount => ({
                ...prevAmount,        // 기존 상태 복사
                value: numericAmount    // value만 업데이트
            }));
            setOrderName(itemsText)

            const tossPayments = await loadTossPayments(clientKey);
            const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
            setWidgets(widgets);
            setInitialSettingDone(true)
        }



        if(cnt == 0)
            fetchPaymentWidgets()
        
        cnt += 1
        
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
                                orderName: orederName,
                                customerName: userInfo.name,
                                customerEmail: userInfo.email,
                                successUrl: `${window.location.origin}/mainPage/paymentPage/paymentProcessingPage/success`,
                                failUrl: `${window.location.origin}/mainPage/paymentPage/paymentProcessingPage/fail`,
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


