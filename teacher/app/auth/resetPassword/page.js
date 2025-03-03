"use client";

import { useState, useEffect } from "react";
import { Row, Column } from "@/app/widgets/structure/Grid";
import SizedBox from "@/app/widgets/structure/SizedBox";
import styles from "./page.module.css";
import { Button1 } from "@/app/components/ui/buttons/Regular";
import TextField from "@/app/components/ui/TextField";
import { ValidatorType, Validator } from "@/app/utils/validator";
import Card from "@/app/components/ui/Card";
import { EmailDropdownButton1 } from "@/app/components/ui/buttons/Dropdown";
import { RowFlex } from "@/app/widgets/structure/Flex";

function EmailCertificationForm({ validate, onSubmit }) {
  const [emailPrefix, setEmailPrefix] = useState("");
  const [emailPostFix, setEmailPostfix] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid = emailPrefix !== "" && emailPostFix !== "";
    setIsValid(valid);
    if (validate) validate(valid);
  }, [emailPrefix, emailPostFix]); 

  const handleSubmit = () => {
    const emailValue = emailPrefix + "@" + emailPostFix;
    if (onSubmit) onSubmit(emailValue);
  };

  return (
    <Column>
      <SizedBox height={178} />
      <Column justifyContent="space-between" alignItems="center">
        <Card width={575} padding={32} justifyItems="center">
          <Column gap={36} alignItems="flex-start">
            <h4 className="ko-md-17">인증 가능한 이메일 주소를 입력하세요.</h4>
            <RowFlex ratios={[280, 15, 200]}>
              <TextField 
                placeholder="example" 
                onChange={setEmailPrefix}
                stretch 
              />
              @
              <EmailDropdownButton1 
                onSelect={setEmailPostfix} 
                stretch 
              />
            </RowFlex>
          </Column>
        </Card>
        <Button1 text="인증하기" onClick={handleSubmit} disabled={!isValid} stretch />
      </Column>
    </Column>
  );
}

function PasswordResettingForm({
  onSubmit,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isValid, validate] = useState(false);

  return (
    <Column>
      <SizedBox height={64} />
      <Column justifyContent="space-between">
        <Column gap={41}>
          <Column>
            <h4 className="ko-md-17">새 비밀번호를 작성해주세요</h4>
            <TextField 
              type="password"
              placeholder="비밀번호/Password" 
              onChange={setInputValue}
              validate={validate}
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
              validators={[ new Validator(inputValue, "아이디/비밀번호가 일치해야 합니다") ]}
              showMismatchOnly
              stretch 
            />
          </Column>
        </Column>
        <Button1 text="저장하기" onClick={onSubmit} stretch />
      </Column>
    </Column>
  );
}

export default function ResetPassword() {
  const [certificated, setCertificated] = useState(false);

  const handleButtonClick = () => {
    // if 
  }

  return (
    <div className={`page ${styles["password"]}`}>
      <div className={styles["container"]}>
        <Column>
          <h3 className={`${styles["title"]} ko-sb-30`}>비밀번호 변경하기</h3>
          {certificated ? <PasswordResettingForm /> : <EmailCertificationForm onSubmit={() => setCertificated(true)}/>}
        </Column>
      </div>
    </div>
  );
}