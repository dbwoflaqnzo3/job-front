'use client'
import { useState } from "react";
import { Row, Column } from "@/app/widgets/structure/Grid";
import { NavIcon, NavTitle, NavItem, NavGroup, TeacherNav } from "@/app/components/layout/Nav";
import { RadioButton, RadioGroup } from "@/app/components/ui/buttons/Radio";
import { CheckboxButton, CheckboxGroup } from "@/app/components/ui/buttons/Checkbox";
import { Button1, Button2, Button3, Button4, Button5, Button6 } from "@/app/components/ui/buttons/Regular";
import { DropdownElement, DropdownButton1, DropdownButton2 } from "@/app/components/ui/buttons/Dropdown";
import { SegmentedButton, SegmentedGroup1, SegmentedGroup2 } from "@/app/components/ui/buttons/Segmented";
import { SemiCircularGraph, CircularGraph } from "@/app/components/ui/CircularGraph";
import TextField from "@/app/components/ui/TextField";
import Card from "@/app/components/ui/Card";
import { Validator, ValidatorType } from "@/app/utils/validator";
import { Table, TableBody, TableExpandableBody } from "@/app/components/ui/Table";
import { Sample, StudentPaymentModel, TeacherPaymentModel } from "@/models/payment";
import { StepElement, StepIndicator } from "@/app/components/layout/StepIndicator";

function nav() {
  return (
    <Column>
      <NavGroup theme="primary">
        <NavTitle title="A" onClick={() => {}} />
        <NavTitle title="B" onClick={() => {}} />
        <NavTitle title="C">
          <NavItem text="C-1" onClick={() => {}} />
          <NavItem text="C-2" onClick={() => {}} />
        </NavTitle>
        <NavIcon icon="help" onClick={() => {}} />
        <NavIcon icon="profile" onMenuItemClick={() => console.log("common")}>
          <NavItem text="1" onClick={() => console.log("1")} />
          <NavItem text="2" onClick={() => {}} />
          <NavItem text="3" onClick={() => {}} />
          <NavItem text="4" textColor="red-3" onClick={() => {}} />
        </NavIcon>
      </NavGroup>
      <TeacherNav />
    </Column>
  );
}

function buttons() {
  return (
    <section>
      <h2>Buttons</h2>
      <Column>
        <Row justifyContent="space-between">
          <Button1 text="Button 1 Default" stretch />
          <Button1 text="Button 1 Disabled" stretch disabled/>
        </Row>
        <Row justifyContent="space-between">
          <Button2 text="Button 2 Default" stretch />
          <Button2 text="Button 2 Disabled" stretch disabled />
          </Row>
        <Row justifyContent="space-between">
          <Button3 text="Button 3 Default" stretch />
          <Button3 text="Button 3 Disabled" stretch disabled />
        </Row>
        <Row justifyContent="space-between">
          <Button4 text="Button 4 Default" stretch />
          <Button4 text="Button 4 Disabled" stretch disabled />
        </Row>
        <Row justifyContent="space-between">
          <Button5 text="Search" stretch />
          <Button5 text="Search" stretch disabled />
        </Row>
        <Row justifyContent="space-between">
          <Button6 text="Button 6 Default" stretch />
          <Button6 text="Button 6 Disabled" stretch disabled />
        </Row>
      </Column>
    </section>
  );
}

function radioButtons() {
  const [selected1, setSelected1] = useState("option1");
  const [selected2, setSelected2] = useState("optionA");

  return (
    <section>
      <h2>Radio Buttons</h2>
      <Column>
        <RadioGroup name="radioGroup1" defaultValue={selected1} onChange={setSelected1} row="1">
          <RadioButton label="옵션 1" value="option1" />
          <RadioButton label="옵션 2" value="option2" />
          <RadioButton label="옵션 3" value="option3" />
          <RadioButton label="옵션 4" value="option4" />
        </RadioGroup>
        <RadioGroup name="radioGroup2" defaultValue={selected2} onChange={setSelected2} row="1">
          <RadioButton label="옵션 A" value="optionA" />
          <RadioButton label="옵션 B" value="optionB" />
          <RadioButton label="옵션 C" value="optionC" />
          <RadioButton label="옵션 D" value="optionD" />
        </RadioGroup>
      </Column>
    </section>
  );
}

function checkboxButtons() {  
  return (
    <section>
      <h2>Checkbox Buttons</h2>
      <CheckboxGroup name="checkboxGroup">
        <Column>
          <CheckboxButton label="전체" entire />
          <Row justifyContent="space-between">          
            <CheckboxButton label="옵션 1" value="option1" />
            <CheckboxButton label="옵션 2" value="option2" />
            <CheckboxButton label="옵션 3" value="option3" />
          </Row>
        </Column>
      </CheckboxGroup>
    </section>
  );
}

function dropdownButtons() {  
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedEmail1, setSelectedEmail1] = useState(null);
  const [selectedPerson1, setSelectedPerson1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedEmail2, setSelectedEmail2] = useState(null);
  const [selectedPerson2, setSelectedPerson2] = useState(null);
  
  return (
    <section>
      <h2>Dropdown Buttons</h2>
      <Column>
        <Row gap={50}>
          <Row justifyContent="space-between">
            <DropdownButton1
              onSelect={setSelectedOption1}
            >
              <DropdownElement label="옵션 1" value="option1"/>
              <DropdownElement label="옵션 2" value="option2"/>
              <DropdownElement label="옵션 3" value="option3"/>
            </DropdownButton1>
            <p className="ko-md-13" style={{width: 100, textAlign: "right"}}>
              {selectedOption1 ? `${selectedOption1.label} 선택됨` : "없음"}
            </p>
          </Row>
          <Row justifyContent="space-between">
            <DropdownButton2
              onSelect={setSelectedOption2}
            >
              <DropdownElement label="옵션 1" value="option1"/>
              <DropdownElement label="옵션 2" value="option2"/>
              <DropdownElement label="옵션 3" value="option3"/>
            </DropdownButton2>
            <p className="ko-md-13" style={{width: 100, textAlign: "right"}}>
              {selectedOption2 ? `${selectedOption2.label} 선택됨` : "없음"}
            </p>
          </Row>
        </Row>
        <Row gap={50}>
          <Row justifyContent="space-between">
            <DropdownButton1
              onSelect={setSelectedEmail1}
              validator={
                new Validator(ValidatorType.EMAIL_POSTFIX, "이메일 형식으로 입력하세요.")
              }
              allowCustom
            >
              <DropdownElement label="gmail.com" value="gmail"/>
              <DropdownElement label="naver.com" value="naver"/>
              <DropdownElement label="daum.net" value="daum"/>
              <DropdownElement label="apple.com" value="apple"/>
            </DropdownButton1>
            <p className="ko-md-13" style={{width: 100, textAlign: "right"}}>
              {selectedEmail1 ? `${selectedEmail1.label} 선택됨` : "없음"}
            </p>
          </Row>
          <Row justifyContent="space-between">
            <DropdownButton2
              onSelect={setSelectedEmail2}
              validator={
                new Validator(ValidatorType.EMAIL_POSTFIX, "이메일 형식으로 입력하세요.")
              }
              allowCustom
            >
              <DropdownElement label="gmail.com" value="gmail"/>
              <DropdownElement label="naver.com" value="naver"/>
              <DropdownElement label="daum.net" value="daum"/>
              <DropdownElement label="apple.com" value="apple"/>
            </DropdownButton2>
            <p className="ko-md-13" style={{width: 100, textAlign: "right"}}>
              {selectedEmail2 ? `${selectedEmail2.label} 선택됨` : "없음"}
            </p>
          </Row>
        </Row>
        <Row gap={50}>
          <Row justifyContent="space-between">
            <DropdownButton1
              onSelect={setSelectedPerson1}
              allowCustom
              search
            >
              <DropdownElement label="반대준" value="ban"/>
              <DropdownElement label="서종현" value="seo"/>
              <DropdownElement label="최지안" value="choi"/>
              <DropdownElement label="유재림" value="yu"/>
            </DropdownButton1>
            <p className="ko-md-13" style={{width: 100, textAlign: "right"}}>
              {selectedPerson1 ? `${selectedPerson1.label} 선택됨` : "없음"}
            </p>
          </Row>
          <Row justifyContent="space-between">
            <DropdownButton2
              onSelect={setSelectedPerson2}
              allowCustom
              search
            >
              <DropdownElement label="반대준" value="ban"/>
              <DropdownElement label="서종현" value="seo"/>
              <DropdownElement label="최지안" value="choi"/>
              <DropdownElement label="유재림" value="yu"/>
            </DropdownButton2>
            <p className="ko-md-13" style={{width: 100, textAlign: "right"}}>
              {selectedPerson2 ? `${selectedPerson2.label} 선택됨` : "없음"}
            </p>
          </Row>
        </Row>
      </Column>
    </section>
  );
}

function segmentedButtons() {
  const [selected, setSelected] = useState("option1");

  return (
    <section>
      <h2>Segmented Buttons</h2>
      <Column>
        <SegmentedGroup1
          name="segmented1Group1" 
          defaultValue={selected} 
          onChange={setSelected}
          stretch
          >
          <SegmentedButton label="옵션 1" value="option1" />
          <SegmentedButton label="옵션 2" value="option2" />
          <SegmentedButton label="옵션 3" value="option3" />
          <SegmentedButton label="옵션 4" value="option4" />
        </SegmentedGroup1>
        <SegmentedGroup1
          name="segmented1Group1" 
          defaultValue={selected} 
          onChange={setSelected}
          ratios={[1, 2, 3, 4]}
          stretch
          >
          <SegmentedButton label="옵션 1" value="option1" />
          <SegmentedButton label="옵션 2" value="option2" />
          <SegmentedButton label="옵션 3" value="option3" />
          <SegmentedButton label="옵션 4" value="option4" />
        </SegmentedGroup1>
        <SegmentedGroup2
          name="segmented2Group1" 
          defaultValue={selected} 
          onChange={setSelected}
          stretch
          >
          <SegmentedButton label="옵션 1" value="option1" />
          <SegmentedButton label="옵션 2" value="option2" />
          <SegmentedButton label="옵션 3" value="option3" />
          <SegmentedButton label="옵션 4" value="option4" />
        </SegmentedGroup2>
        <SegmentedGroup2
          name="segmented2Group2" 
          defaultValue={selected} 
          onChange={setSelected}
          ratios={[4, 3, 2, 1]}
          stretch
          >
          <SegmentedButton label="옵션 1" value="option1" />
          <SegmentedButton label="옵션 2" value="option2" />
          <SegmentedButton label="옵션 3" value="option3" />
          <SegmentedButton label="옵션 4" value="option4" />
        </SegmentedGroup2>
      </Column>
    </section>
  );
}

function textFields() {
  return (
    <section>
      <h2>Text Fields</h2>
      <Column>
        <Row>
          <TextField placeholder="Default" stretch />
          <TextField placeholder="Error" error stretch />
        </Row>
        <Row>
          <TextField 
            placeholder="비밀번호를 입력하세요" 
            validators={[
              new Validator(ValidatorType.AT_LEAST_EIGHT, "비밀번호는 최소 8자리 이상이어야 합니다"),
              new Validator(ValidatorType.INCLUDE_ALPHABET_SPECIAL_CHAR_NUMBER, "영문/특수문자/숫자가 포함되어야 합니다"),
              new Validator(ValidatorType.SEQUENTIAL_NUMBER_CHAR, "연속된 숫자/문자는 사용이 불가합니다"),
            ]}
            stretch 
          />
        </Row>
      </Column>
    </section>
  );
}

function circulargraphes() {
  return (
    <section>
      <h2>Circular Progresses</h2>
      <Row>
        <SemiCircularGraph percentage={.5} />
        <CircularGraph percentage={.2} />
      </Row>
    </section>
  );
}

function table() {
  const [selectedIndex1, setSelectedIndex1] = useState(-1);
  const textStyles1 = ["ko-md-17", "ko-md-17", "ko-md-17", "ko-md-24"];
  const data1 = [
    new TeacherPaymentModel({
      title: "12월 멤버십 결제",
      billingDate: new Date("2024-12-01T00:00:00Z"),
      date: new Date("2024-12-05T00:00:00Z"),
      method: "신용카드",
      amount: 200000,
      manager: "JOB 영어학원",
    }),
    new TeacherPaymentModel({
      title: "11월 멤버십 결제",
      billingDate: new Date("2024-11-01T00:00:00Z"),
      date: new Date("2024-11-05T00:00:00Z"),
      method: "신용카드",
      amount: 200000,
      manager: "JOB 영어학원",
    }),
    new TeacherPaymentModel({
      title: "11월 멤버십 결제",
      billingDate: new Date("2024-11-01T00:00:00Z"),
      date: new Date("2024-11-05T00:00:00Z"),
      method: "신용카드",
      amount: 200000,
      manager: "JOB 영어학원",
    }),
  ];
  
  const textStyles2 = ["ko-md-17", "ko-md-17", "ko-md-17", "ko-md-24"];
  const data2 = [
    new StudentPaymentModel({
      title: "정기결제",
      amountInfo: { 
        "12월 학원비": 200000,
        "교재비": 50000 
      },
      billingDate: new Date("2024-12-05"),
      date: new Date("2024-12-12"),
      method: "신용카드",
      amount: 250000,
      manager: "JOB 영어학원",
      studentName: "반대준",
    }),
  
    new StudentPaymentModel({
      title: "보충수업비",
      amountInfo: {
        "수학 보충수업비": 120000
      },
      billingDate: new Date("2024-11-28"),
      date: new Date("2024-12-01"),
      method: "계좌이체",
      amount: 120000,
      manager: "JOB 영어학원",
      studentName: "서종현",
    }),
  
    new StudentPaymentModel({
      title: "방학특강",
      amountInfo: {
        "겨울방학 영어특강비": 180000,
        "교재비": 30000
      },
      billingDate: new Date("2025-01-02"),
      date: new Date("2025-01-05"),
      method: "현금",
      amount: 210000,
      manager: "JOB 영어학원",
      studentName: "최지안",
    }),
  ];

  return (
    <section>
      <h2>Table</h2>
      <Column gap={30}>
        <Column>
          <p>{selectedIndex1}번 선택됨</p>
          <Table
            paddingLeft={118}
            paddingRight={72}
            // height={300}
            columnRatios={[94, 212, 94, 212]}
          >
            <TableBody 
              textStyles={textStyles1}
              onSelect={setSelectedIndex1}
            >{data1}</TableBody>
          </Table>
        </Column>
        <Column>
          <Table
            theme="secondary"
            paddingLeft={48}
            paddingRight={48}
            // height={500}
            columnRatios={[94, 94, 180, 180]}
          >
            <TableExpandableBody
              textStyles={textStyles2}
            >{data2}</TableExpandableBody>
          </Table>
        </Column>
      </Column>
    </section>
  );
}

function stepIndicator() {
  const buildIndicator = (progress) => (
    <StepIndicator currentStep={progress}>
      <StepElement label="학원 정보 입력" />
      <StepElement label="회원 정보 입력 및 인증" />
      <StepElement label="이용약관 동의" />
      <StepElement label="가입 완료" />
    </StepIndicator>
  );

  return (
    <Column>
      {buildIndicator(1)}
      {buildIndicator(2)}
      {buildIndicator(3)}
      {buildIndicator(4)}
    </Column>
  );
}

export default function Component() {
  return (
    <div className="page">
      {nav()}
      <Card margin={50}>
        <div style={{width: "80%"}}>
          <Column justifyContent="space-between">
            {buttons()}
            {radioButtons()}
            {checkboxButtons()}
            {dropdownButtons()}
            {segmentedButtons()}
            {textFields()}
            {circulargraphes()}
            {table()}
            {stepIndicator()}
            {/* <div style={{height: "400px"}} /> */}
          </Column>
        </div>
      </Card>
    </div>
  );
}