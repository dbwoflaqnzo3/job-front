"use client";

import { useState } from "react";
import { Column } from "@/app/widgets/structure/Grid";
import SizedBox from "@/app/widgets/structure/SizedBox";
import styles from "./page.module.css";
import { Button1 } from "@/app/components/ui/buttons/Regular";
import TextField from "@/app/components/ui/TextField";
import { ValidatorType, Validator } from "@/app/utils/validator";

export default function ResetPassword() {
    const [inputValue, setInputValue] = useState("");

    return (
        <div className={`page ${styles["password"]}`}>
            <div className={styles["container"]}>
                <Column gap={60}>
                    <h3 className={`${styles["title"]} ko-sb-30`}>비밀번호 변경하기</h3>
                    <Column gap={41}>
                        <Column>
                            <h4 className="ko-md-17">새 비밀번호를 작성해주세요</h4>
                            <TextField
                                type="password"
                                placeholder="비밀번호/Password"
                                onChange={setInputValue}
                                validators={[
                                    new Validator(ValidatorType.AT_LEAST_EIGHT, "비밀번호는 최소 8자리 이상이어야 합니다"),
                                    new Validator(ValidatorType.INCLUDE_ALPHABET_SPECIAL_CHAR_NUMBER, "영문/특수문자/숫자가 포함되어야 합니다"),
                                    new Validator(ValidatorType.SEQUENTIAL_NUMBER_CHAR, "연속된 숫자/문자는 사용이 불가합니다"),
                                ]}
                                stretch
                            />
                        </Column>
                        <Column>
                            <h4 className="ko-md-17">한 번 더 작성해주세요</h4>
                            <TextField
                                type="password"
                                placeholder="비밀번호/Password"
                                validators={[new Validator(inputValue, "아이디/비밀번호가 일치해야 합니다")]}
                                // showMismatchOnly
                                stretch
                            />
                        </Column>
                    </Column>
                </Column>
                <SizedBox height={162} />
                <Button1 text="저장하기" onClick={() => { }} stretch />
            </div>
        </div>
    );
}