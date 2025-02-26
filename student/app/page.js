'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { NavGroup, NavTitle, NavIcon, NavItem } from "@/app/components/layout/Nav";

export function PageLayout({ children, hide }) {

  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainedr}>
        <div style={{ opacity: hide ? 0 : 1 }}>
        <NavGroup theme="primary">
          <NavTitle title="학습하기" onClick={() => { router.push("/mainPage/lessonListPage") }} />
          <NavTitle title="학습캘린더" onClick={() => { router.push("/mainPage/studentCalendar") }} />
          <NavTitle title="질문하기" onClick={() => { router.push("/mainPage/askPage") }} />
          <NavTitle title="결제하기" onMenuItemClick = {() => {}}>
            <NavItem text="결제 내역" onClick={() => { router.push("/mainPage/paymentPage?tab=paymentRecordPage");  }} />
            <NavItem text="결제 관리" onClick={() => { router.push("/mainPage/paymentPage?tab=paymentPendingPage"); }} />
          </NavTitle>
          <NavIcon icon="help" onClick={() => { router.push("/mainPage/helpPage") }}  />
          <NavIcon icon="profile">
            <NavItem text="내 정보" onClick={() => { router.push("/mainPage/myInfo") }} />
            <NavItem text="로그아웃" textColor="red-3" onClick={() => {
              document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear token on logout
              router.push("/loginPage");
            }} />
          </NavIcon>
        </NavGroup>
        </div>
        <div className={styles.navBottomMargin} />
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <PageLayout>
      <div>Welcome to JOB Student Page</div>
    </PageLayout>
  );
}
