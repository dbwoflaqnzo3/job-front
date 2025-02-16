'use client'

import Image from "next/image";
import styles from "./page.module.css";
<<<<<<< HEAD
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import { NavGroup, NavTitle, NavIcon, NavItem } from "@/app/components/layout/Nav";

export function PageLayout({ children }) {

  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <NavGroup theme="primary">
          <NavTitle title="학습하기" onClick={() => { router.push("/mainPage/lessonListPage") }} />
          <NavTitle title="학습캘린더" onClick={() => { router.push("/mainPage/studentCalendar") }} />
          <NavTitle title="질문하기" onClick={() => { router.push("/mainPage/askPage") }} />
          <NavTitle title="결제하기" onMenuItemClick = {() => {}}>
            <NavItem text="결제 내역" onClick={() => { router.push("/mainPage/paymentPage") }} />
            <NavItem text="결제 관리" onClick={() => { router.push("/mainPage/paymentPage") }} />
          </NavTitle>
          <NavIcon icon="help" onClick={() => { router.push("/mainPage/helpPage") }}  />
          <NavIcon icon="profile">
            <NavItem text="내 정보" onClick={() => { router.push("/mainPage/myInfo") }} />
            <NavItem text="로그아웃" textColor="red-3" onClick={() => { }} />
          </NavIcon>
        </NavGroup>
        <div className={styles.navBottomMargin} />
        {children}
      </div>
    </div>
=======
=======
import { Grid } from "./widgets/structure/Grid";
>>>>>>> 2e0e673 (Next.js svg import 오류 수정)
import { NavGroup, NavTitle, NavIcon, NavItem } from "@/app/components/layout/Nav";

function pageLayout() {
  return (
    <NavGroup theme="primary">
      <NavTitle title="A" onClick={() => {}} />
      <NavTitle title="B" onClick={() => {}} />
      <NavTitle title="C">
        <NavItem text="C-1" onClick={() => {}} />
        <NavItem text="C-2" onClick={() => {}} />
      </NavTitle>
      <NavIcon icon="help" onClick={() => {}} />
      <NavIcon icon="profile">
        <NavItem text="1" onClick={() => {}} />
        <NavItem text="2" onClick={() => {}} />
        <NavItem text="3" onClick={() => {}} />
        <NavItem text="4" textColor="red-3" onClick={() => {}} />
      </NavIcon>
    </NavGroup>
>>>>>>> 3ee5730 (feat[#44] : component 적용 오류 해결 중)
  );
}

export default function Home() {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <PageLayout>
      <div>Welcome to JOB Student Page</div>
    </PageLayout>
=======
    <div>
      {
        pageLayout()
      }
    </div>
>>>>>>> 3ee5730 (feat[#44] : component 적용 오류 해결 중)
=======
    <div>{pageLayout()}</div>
>>>>>>> 2e0e673 (Next.js svg import 오류 수정)
  );
}
