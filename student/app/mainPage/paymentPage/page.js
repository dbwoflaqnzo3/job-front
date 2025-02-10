<<<<<<< HEAD
import styles from './page.module.css';
import { PageLayout } from '@/app/page';

export default function PaymentPage() {
    return (
    <PageLayout>
        <div>
            결제 페이지좀 만들어주세요...
        </div>
    </PageLayout>
=======
import PaymentWidget from "@/app/mainPage/paymentPage/paymentWidget";
import styles from './page.module.css';

export default function PaymentPage() {
    return (
    <div className={`${styles.wrapper} ${styles['w-100']}`}>
        <h1 className={styles['text-center']}>결제하기</h1>
        <PaymentWidget />
    </div>
>>>>>>> 8090f42 (feat[#42] : 결제 페이지 1차 제작)
    );
}
