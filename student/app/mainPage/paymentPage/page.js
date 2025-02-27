"use client"

import styles from './page.module.css';
import { PageLayout } from '@/app/page';
import { useSearchParams } from "next/navigation";

import PaymentPendingPage from './paymentPendingPage/page';
import PaymentRecordPage from './paymentRecordPage/page';

export default function PaymentPage() {

    const searchParams = useSearchParams();
    const tab = searchParams.get("tab"); // "paymentPendingPage"

    console.log(tab)

    return (
    <PageLayout hide={false}>
        {
            tab == "paymentPendingPage"?
            <PaymentPendingPage/>
            :
            tab == "paymentRecordPage"?
            <PaymentRecordPage/>
            :
            <div>잘못된 페이지 접근 입니다.</div>
        }
    </PageLayout>
    );
}
