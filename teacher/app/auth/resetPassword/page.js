"use client";

import { Column } from "@/app/widgets/structure/Grid";
import SizedBox from "@/app/widgets/structure/SizedBox";
import styles from "./page.module.css";
import { Button1 } from "@/app/components/ui/buttons/Regular";

export default function ResetPassword() {
  return (
    <div className={`page ${styles["password"]}`}>
      <div className={styles["container"]}>
        <Column gap={60}>
          <h3 className={`${styles["title"]} ko-sb-30`}>비밀번호 변경하기</h3>
          <Column gap={41}>
            <Column>
              <h4 className={`ko-md-17`}>새 비밀번호를 작성해주세요</h4>
            </Column>
            <Column>
              <h4 className={`ko-md-17`}>한번 더 작성해주세요</h4>
            </Column>
          </Column>
        </Column>
        <SizedBox height={162} />
        <Button1 text="저장하기" onClick={() => {}} stretch />
      </div>
    </div>
  );
}