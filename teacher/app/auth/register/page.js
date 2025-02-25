"use client";

import { useState, useEffect } from "react";
import { Column, Row } from "@/app/widgets/structure/Grid";
import styles from "./page.module.css";
import { RadioButton, RadioGroup } from "@/app/components/ui/buttons/Radio";
import { Button1, Button2 } from "@/app/components/ui/buttons/Regular";
import { StepElement, StepIndicator } from "@/app/components/layout/StepIndicator";
import TextField from "@/app/components/ui/TextField";
import { DropdownButton1, DropdownElement } from "@/app/components/ui/buttons/Dropdown";

function RoleSelectionForm({ onSubmit }) {
  const [selectedRole, setSelectedRole] = useState("");

  const onClick = () => onSubmit(selectedRole);
  
  return (
    <div className={styles["role-container"]}>
      <Column gap={74} alignItems="center">
        <div className={styles["radio-container"]}>
          <Column gap={36} alignItems="flex-start">
            <h4 className={`${styles["title"]} ko-sb-18`}>해당하는 직책을 선택해 주세요.</h4>
            <RadioGroup name="role" onChange={setSelectedRole}>
              <RadioButton label="학원장" value="director" />
              <RadioButton label="교사" value="teacher" />
            </RadioGroup>
          </Column>
        </div>
        <Button1 
          text="다음으로"
          width={400}
          disabled={!selectedRole} 
          onClick={onClick} 
        />
      </Column>
    </div>
  );

}

const Indicator = ({ stage }) => (
  <StepIndicator currentStep={stage}>
    <StepElement label="학원 정보 입력" />
    <StepElement label="회원 정보 입력 및 인증" />
    <StepElement label="이용약관 동의" />
    <StepElement label="가입 완료" />
  </StepIndicator>
);

const AcademyInfoFormForDirector = ({ onSubmit }) => {
  const [zonecode, setZonecode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [academyName, setAcademyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [_, setIsScriptLoaded] = useState(false);
  const [isDetailAddressDisabled, setIsDetailAddressDisabled] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (window && !window.daum) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.body.appendChild(script);
      return;
    } 
    setIsScriptLoaded(true);
  }, []);

  useEffect(() => {
    setIsDetailAddressDisabled(!(zonecode && roadAddress));
  }, [zonecode, roadAddress]);

  useEffect(() => {
    setIsValid(academyName.trim() !== "" && zonecode.trim() !== "" && roadAddress.trim() !== "" && phoneNumber.trim() !== "");
  }, [academyName, zonecode, roadAddress, phoneNumber]);

  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZonecode(data.zonecode);
        setRoadAddress(data.roadAddress);
      },
    }).open();
  };

  return (
    <div className={styles["stage-container"]}>
      <Column gap={65} alignItems="center">
        <Indicator stage={1} />
        <div>
          <Column gap={36}>
            <Row gap={24}>
              <Row><div className={styles["header"]}>학원 이름</div></Row>
              <TextField 
                placeholder="이름" 
                value={academyName} 
                onChange={setAcademyName} 
                stretch 
              />
            </Row>
            <Column gap={16}>
              <Row gap={24}>
                <div className={styles["header"]}>학원 주소</div>
                <Row justifyContent="space-between">
                  <TextField 
                    placeholder="우편번호" 
                    value={zonecode} 
                    disabled 
                    stretch 
                  />
                  <Button2 text="우편번호 찾기" onClick={handleSearchAddress} stretch />
                </Row>
              </Row>
              <Row gap={24}>
                <Row><div className={styles["header"]}></div></Row>
                <TextField 
                  placeholder="주소" 
                  value={roadAddress} 
                  disabled 
                  stretch 
                />
              </Row>
              <Row gap={24}>
                <Row><div className={styles["header"]}></div></Row>
                <TextField 
                  placeholder="상세주소" 
                  value={detailAddress} 
                  onChange={setDetailAddress} 
                  disabled={isDetailAddressDisabled}
                  stretch 
                />
              </Row>
            </Column>
            <Row gap={24}>
              <div className={styles["header"]}>학원 전화번호</div>
              <Row>
                <DropdownButton1 placeholder="선택 전">
                  <DropdownElement label="010" />
                  <DropdownElement label="02" />
                  <DropdownElement label="031" />
                </DropdownButton1>
                <TextField 
                  type="tel"
                  placeholder="휴대폰 번호" 
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  stretch 
                />
              </Row>
            </Row>
          </Column>  
        </div>
        <Button1 text="다음으로" width={400} disabled={!isValid} onClick={onSubmit} />
      </Column>
    </div>
  );
}

const AcademyInfoFormForTeacher = () => {
  const [academyCode, setAcademyCode] = useState("");

  return (
    <div className={styles["stage-container"]}>
      <Column gap={65} alignItems="center">
        <Indicator stage={1} />
        <Column gap={36} alignItems="center">
          <h4 className={`${styles["title"]} ko-sb-18`}>학원 코드를 입력해 주세요.</h4>
          <Column gap={120} alignItems="center">
            <TextField 
              width={448} 
              placeholder="코드를 입력해주세요" 
              value={academyCode}
              onChange={setAcademyCode}
            />
            <Button1 
              width={400} 
              text="다음" 
              disabled={academyCode.trim() === ""}
            />
          </Column>
        </Column>
      </Column>
    </div>
  );
}

function AcademyInfoForm({ role, onSubmit }) {
  switch (role) {
    case "director": return <AcademyInfoFormForDirector onSubmit={onSubmit} />;
    case "teacher": return <AcademyInfoFormForTeacher onSubmit={onSubmit} />;
  }
}



export default function Register() {
  const [stage, setState] = useState(0);
  const [role, setRole] = useState("");
  const next = () => setState(stage + 1);

  const onRoleSelectionSubmit = (role) => {
    setRole(role);
    console.log(role);
    next();
  }

  const forms = [
    <RoleSelectionForm onSubmit={onRoleSelectionSubmit} />,
    <AcademyInfoForm role={role} onSubmit={next} />
  ];

  return (
    <div className="page">
      <Column alignItems="center">
        <h3 className={`${styles["title"]} ko-sb-30`}>회원가입</h3>
        <div className={styles["content-container"]}>{forms[stage]}</div>
      </Column>
    </div>
  );
}