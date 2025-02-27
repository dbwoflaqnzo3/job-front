'use client'
import { useState } from "react";
import { Row, Column } from "@/app/widgets/structure/Grid";
import { NavIcon, NavTitle, NavItem, NavGroup } from "@/app/components/layout/Nav";
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
import { StudentPaymentModel, TeacherPaymentModel } from "@/models/payment";
import { StepElement, StepIndicator } from "@/app/components/layout/StepIndicator";
import SizedBox from "@/app/widgets/structure/SizedBox";
import "./page.css";
import { InfoCardButton } from "@/app/components/ui/buttons/InfoCard";
import { Popup, PopupContent, PopupButtons, showPopup } from "@/app/components/ui/popup/Popup";

function nav(theme) {
  return (
    <div>
      <NavGroup theme={theme}>
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
    </div>
  );
}

function buttons(theme) {
  return (
    <section>
      <h2>Buttons</h2>
      <Column>
        <Row justifyContent="space-between">
          <Button1 theme={theme} text="Button 1 Default" stretch />
          <Button1 theme={theme} text="Button 1 Disabled" stretch disabled/>
        </Row>
        <Row justifyContent="space-between">
          <Button2 theme={theme} text="Button 2 Default" stretch />
          <Button2 theme={theme} text="Button 2 Disabled" stretch disabled />
          </Row>
        <Row justifyContent="space-between">
          <Button3 theme={theme} text="Button 3 Default" stretch />
          <Button3 theme={theme} text="Button 3 Disabled" stretch disabled />
        </Row>
        <Row justifyContent="space-between">
          <Button4 theme={theme} text="Button 4 Default" stretch />
          <Button4 theme={theme} text="Button 4 Disabled" stretch disabled />
        </Row>
        <Row justifyContent="space-between">
          <Button5 theme={theme} text="Search" stretch />
          <Button5 theme={theme} text="Search" stretch disabled />
        </Row>
        <Row justifyContent="space-between">
          <Button6 theme={theme} text="Button 6 Default" stretch />
          <Button6 theme={theme} text="Button 6 Disabled" stretch disabled />
        </Row>
      </Column>
    </section>
  );
}

function radioButtons(theme) {
  const [selected1, setSelected1] = useState("option1");
  const [selected2, setSelected2] = useState("optionA");

  return (
    <section>
      <h2>Radio Buttons</h2>
      <Column>
        <RadioGroup theme={theme} name="radioGroup1" defaultValue={selected1} onChange={setSelected1} row="1">
          <RadioButton label="옵션 1" value="option1" />
          <RadioButton label="옵션 2" value="option2" />
          <RadioButton label="옵션 3" value="option3" />
          <RadioButton label="옵션 4" value="option4" />
        </RadioGroup>
        <RadioGroup theme={theme} name="radioGroup2" defaultValue={selected2} onChange={setSelected2} row="1">
          <RadioButton label="옵션 A" value="optionA" />
          <RadioButton label="옵션 B" value="optionB" />
          <RadioButton label="옵션 C" value="optionC" />
          <RadioButton label="옵션 D" value="optionD" />
        </RadioGroup>
      </Column>
    </section>
  );
}

function checkboxButtons(theme) {  
  return (
    <section>
      <h2>Checkbox Buttons</h2>
      <CheckboxGroup theme={theme} name="checkboxGroup">
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

function dropdownButtons(theme) {  
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedEmail1, setSelectedEmail1] = useState(null);
  const [selectedPerson1, setSelectedPerson1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedEmail2, setSelectedEmail2] = useState(null);
  const [selectedPerson2, setSelectedPerson2] = useState(null);
  
  return (
    <section>
      <h2>Dropdown Buttons</h2>
      <Column gap={30}>
        <Column gap={10}>
          <Row justifyContent="space-between">
            <DropdownButton1
              theme={theme}
              onSelect={setSelectedOption1}
              stretch
            >
              <DropdownElement label="옵션 1" value="option1"/>
              <DropdownElement label="옵션 2" value="option2"/>
              <DropdownElement label="옵션 3" value="option3"/>
            </DropdownButton1>
            <p className="ko-md-13" style={{width: 300, textAlign: "right"}}>
              {selectedOption1 ? `${selectedOption1} 선택됨` : "없음"}
            </p>
          </Row>
          <Row justifyContent="space-between">
            <DropdownButton2
              theme={theme}
              onSelect={setSelectedOption2}
              stretch
            >
              <DropdownElement label="옵션 1" value="option1"/>
              <DropdownElement label="옵션 2" value="option2"/>
              <DropdownElement label="옵션 3" value="option3"/>
            </DropdownButton2>
            <p className="ko-md-13" style={{width: 300, textAlign: "right"}}>
              {selectedOption2 ? `${selectedOption2} 선택됨` : "없음"}
            </p>
          </Row>
        </Column>
        <Column gap={10}>
          <Row justifyContent="space-between">
            <DropdownButton1
              theme={theme}
              onSelect={setSelectedEmail1}
              validator={
                new Validator(ValidatorType.EMAIL_POSTFIX, "이메일 형식으로 입력하세요.")
              }
              stretch
              allowCustom
            >
              <DropdownElement label="gmail.com" value="gmail"/>
              <DropdownElement label="naver.com" value="naver"/>
              <DropdownElement label="daum.net" value="daum"/>
              <DropdownElement label="apple.com" value="apple"/>
            </DropdownButton1>
            <p className="ko-md-13" style={{width: 300, textAlign: "right"}}>
              {selectedEmail1 ? `${selectedEmail1} 선택됨` : "없음"}
            </p>
          </Row>
          <Row justifyContent="space-between">
            <DropdownButton2
              theme={theme}
              onSelect={setSelectedEmail2}
              validator={
                new Validator(ValidatorType.EMAIL_POSTFIX, "이메일 형식으로 입력하세요.")
              }
              stretch
              allowCustom
            >
              <DropdownElement label="gmail.com" value="gmail"/>
              <DropdownElement label="naver.com" value="naver"/>
              <DropdownElement label="daum.net" value="daum"/>
              <DropdownElement label="apple.com" value="apple"/>
            </DropdownButton2>
            <p className="ko-md-13" style={{width: 300, textAlign: "right"}}>
              {selectedEmail2 ? `${selectedEmail2} 선택됨` : "없음"}
            </p>
          </Row>
        </Column>
        <Column gap={10}>
          <Row justifyContent="space-between">
            <DropdownButton1
              theme={theme}
              onSelect={setSelectedPerson1}
              allowCustom
              stretch
              search
            >
              <DropdownElement label="반대준" value="ban"/>
              <DropdownElement label="서종현" value="seo"/>
              <DropdownElement label="최지안" value="choi"/>
              <DropdownElement label="유재림" value="yu"/>
            </DropdownButton1>
            <p className="ko-md-13" style={{width: 300, textAlign: "right"}}>
              {selectedPerson1 ? `${selectedPerson1} 선택됨` : "없음"}
            </p>
          </Row>
          <Row justifyContent="space-between">
            <DropdownButton2
              theme={theme}
              onSelect={setSelectedPerson2}
              allowCustom
              stretch
              search
            >
              <DropdownElement label="반대준" value="ban"/>
              <DropdownElement label="서종현" value="seo"/>
              <DropdownElement label="최지안" value="choi"/>
              <DropdownElement label="유재림" value="yu"/>
            </DropdownButton2>
            <p className="ko-md-13" style={{width: 300, textAlign: "right"}}>
              {selectedPerson2 ? `${selectedPerson2} 선택됨` : "없음"}
            </p>
          </Row>
        </Column>
      </Column>
    </section>
  );
}

function segmentedButtons(theme) {
  const [selected, setSelected] = useState("option1");

  return (
    <section>
      <h2>Segmented Buttons</h2>
      <Column>
        <SegmentedGroup1
          theme={theme}
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
          theme={theme}
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
          theme={theme}
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
          theme={theme}
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

function textFields(theme) {
  return (
    <section>
      <h2>Text Fields</h2>
      <Column>
        <TextField 
          theme={theme}
          placeholder="비밀번호를 입력하세요" 
          validators={[
            new Validator(ValidatorType.AT_LEAST_EIGHT, "비밀번호는 최소 8자리 이상이어야 합니다"),
            new Validator(ValidatorType.INCLUDE_ALPHABET_SPECIAL_CHAR_NUMBER, "영문/특수문자/숫자가 포함되어야 합니다"),
            new Validator(ValidatorType.SEQUENTIAL_NUMBER_CHAR, "연속된 숫자/문자는 사용이 불가합니다"),
          ]}
          showMismatchOnly
          stretch 
        />
        <TextField 
          theme={theme}
          placeholder="비밀번호를 입력하세요" 
          validators={[
            new Validator(ValidatorType.AT_LEAST_EIGHT, "비밀번호는 최소 8자리 이상이어야 합니다"),
            new Validator(ValidatorType.INCLUDE_ALPHABET_SPECIAL_CHAR_NUMBER, "영문/특수문자/숫자가 포함되어야 합니다"),
            new Validator(ValidatorType.SEQUENTIAL_NUMBER_CHAR, "연속된 숫자/문자는 사용이 불가합니다"),
          ]}
          stretch
        />
        <TextField 
          theme={theme}
          type="password"
          placeholder="비밀번호를 입력하세요"
          validators={[
            new Validator(ValidatorType.AT_LEAST_EIGHT, "비밀번호는 최소 8자리 이상이어야 합니다"),
            new Validator(ValidatorType.INCLUDE_ALPHABET_SPECIAL_CHAR_NUMBER, "영문/특수문자/숫자가 포함되어야 합니다"),
            new Validator(ValidatorType.SEQUENTIAL_NUMBER_CHAR, "연속된 숫자/문자는 사용이 불가합니다"),
          ]}
          stretch
        />
      </Column>
    </section>
  );
}

function circulargraphes(theme) {
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

function table(theme) {
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
            theme={theme}
            paddingLeft={118}
            paddingRight={72}
            height={300}
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
            theme={theme}
            paddingLeft={48}
            paddingRight={48}
            height={300}
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

function stepIndicator(theme) {
  const buildIndicator = (progress) => (
    <StepIndicator theme={theme} currentStep={progress}>
      <StepElement label="First Step" />
      <StepElement label="Second Step" />
      <StepElement label="Third Step" />
      <StepElement label="Last Step" />
    </StepIndicator>
  );

  return (
    <section>
      <h2>Step Indicator</h2>
        <Column>
        {buildIndicator(1)}
        {buildIndicator(2)}
        {buildIndicator(3)}
        {buildIndicator(4)}
      </Column>
    </section>
  );
}

function infoCardButtons(theme) {
  return (
    <section>
      <h2>Info Card Buttons</h2>
      <Row>
        <InfoCardButton theme={theme} text="Add Button" icon="add" textWidth={.4} />
        <InfoCardButton theme={theme} text="Phone Button" icon="phone" />
      </Row>
    </section>
  );
}

function popupButtons(theme) {
  const p1 = "popup-1";
  const p2 = "popup-2";
  const [openedPopup, openPopup] = useState("");
  const [inputValue, setInputValue] = useState("");

  const onPopupClose = () => {
    openPopup("");
    setInputValue("");
  }

  return (
    <section>
      <h2>Popups</h2>
      <Popup
        name={p1}
        theme={theme}
        title="작성하신 연락처로\n인증번호가 발송되었어요"
        display={openedPopup === p1}
        onClose={onPopupClose}
      >
        <PopupContent>
          <Row gap={24}>
            <TextField
              placeholder="인증번호를 입력하세요"
              onChange={setInputValue}
              allowSpace={false}
              stretch
            />
            <p>3:00</p>
          </Row>
        </PopupContent>
        <PopupButtons>
          <Button1 
            text="인증하기"
            onClick={() => {}}
            disabled={inputValue === ""}
            stretch
          />
          <Button4 
            text="다음에 하기"
            onClick={onPopupClose}
            disabled={false}
            stretch
          />
        </PopupButtons>
      </Popup>
      <Popup
        name={p2}
        theme={theme}
        title="인증에 실패했어요"
        description="다시 시도하시겠어요?"
        image="popupError"
        imagePosY={.45}
        display={openedPopup === p2}
        onClose={onPopupClose}
      >
        <PopupButtons>
          <Button1 
            text="인증번호 다시 받기"
            onClick={() => {}}
            stretch
          />
          <Button4 
            text="다음에 하기"
            onClick={onPopupClose}
            disabled={false}
            stretch
          />
        </PopupButtons>
      </Popup>
      <Row gap={20}>
        <Button1 theme={theme} text="팝업1 열기" onClick={() => openPopup(p1)} />
        <Button2 theme={theme} text="팝업2 열기" onClick={() => openPopup(p2)} />
      </Row>
    </section>
  );
}

export default function Component() {
  const [theme, setTheme] = useState("primary");

  return (
    <div className="page component">
      <div className="theme-changer" style={{
        "--color": `var(--${theme}-300)`
      }}>
        <SegmentedGroup2
            theme={theme}
            name="theme" 
            defaultValue={theme} 
            onChange={setTheme}
            width={200}
            >
            <SegmentedButton label="primary" value="primary" />
            <SegmentedButton label="secondary" value="secondary" />
          </SegmentedGroup2>
        <SizedBox height={40} />
      </div>
      {nav(theme)}
      <Card theme={theme} margin={50} border>
        <div style={{width: "80%"}}>
          <Column justifyContent="space-between">
            {buttons(theme)}
            {radioButtons(theme)}
            {checkboxButtons(theme)}
            {dropdownButtons(theme)}
            {segmentedButtons(theme)}
            {textFields(theme)}
            {circulargraphes(theme)}
            {table(theme)}
            {stepIndicator(theme)}
            {infoCardButtons(theme)}
            {popupButtons(theme)}
            <SizedBox height={400}/>
          </Column>
        </div>
      </Card>
    </div>
  );
}