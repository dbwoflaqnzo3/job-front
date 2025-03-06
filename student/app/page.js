'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { NavGroup, NavTitle, NavIcon, NavItem } from "@/app/components/layout/Nav";

export function PageLayout({ children, hide, collapse }) {

  const router = useRouter();

  const handleLogout = async() => {
    const response = await fetch('http://localhost:8080/userToken/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },

      credentials: 'include',
    });

    const result = await response.json();

    console.log(result)

    if(response.status == 200)
    {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear token on logout
      router.push("/loginPage");
    }
    else{
      console.log("로그아웃 중 에러발생")
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
      <div
          className={styles.navContainer}
          style={{
            display: collapse ? "none" : "block", // NavBar 완전히 제거
            opacity: hide ? 0 : 1, // NavBar 숨기되 공간은 유지
            transition: "opacity 0.3s ease"
          }}
        >
        <NavGroup theme="primary" >
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
                handleLogout()
            }} />
          </NavIcon>
        </NavGroup>
        </div>
        <div className={styles.navBottomMargin} style={{display: collapse ? "none" : "block",}}/>
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
