'use client'
import { useState } from "react";
import { Row, Column } from "@/app/widgets/structure/Grid";
import { RadioButton, RadioGroup } from "@/app/components/ui/buttons/Radio";
import { CheckboxButton, CheckboxGroup } from "@/app/components/ui/buttons/Checkbox";
import { Button1, Button2, Button3, Button4, Button5, Button6 } from "@/app/components/ui/buttons/Regular";
import { DropdownElement, DropdownButton } from "@/app/components/ui/buttons/Dropdown";
import { SegmentedButton, SegmentedGroup } from "@/app/components/ui/buttons/Segmented";
import TextField from "@/app/components/ui/TextField";
import { SemiCircularGraph, CircularGraph } from "@/app/components/ui/CircularGraph";
import Card from "@/app/components/ui/Card";

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
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  
  return (
    <section>
      <h2>Dropdown Buttons</h2>
      <Column>
        <Row justifyContent="space-between">
          <DropdownButton
            onSelect={(item) => setSelectedOption(item)}
            stretch
          >
            <DropdownElement label="옵션 1" value="option1"/>
            <DropdownElement label="옵션 2" value="option2"/>
            <DropdownElement label="옵션 3" value="option3"/>
          </DropdownButton>
          <p style={{width: 200, textAlign: "right"}}>
            {selectedOption ? `${selectedOption.label} 선택됨` : "없음"}
          </p>
        </Row>
        <Row justifyContent="space-between">
          <DropdownButton
            onSelect={(item) => setSelectedEmail(item)}
            allowCustom
            stretch
          >
            <DropdownElement label="gmail.com" value="gmail"/>
            <DropdownElement label="naver.com" value="naver"/>
            <DropdownElement label="daum.net" value="daum"/>
            <DropdownElement label="apple.com" value="apple"/>
          </DropdownButton>
          <p style={{width: 200, textAlign: "right"}}>
            {selectedEmail ? `${selectedEmail.label} 선택됨` : "없음"}
          </p>
        </Row>
        <Row justifyContent="space-between">
          <DropdownButton
            onSelect={(item) => setSelectedPerson(item)}
            allowCustom
            search
            stretch
          >
            <DropdownElement label="반대준" value="ban"/>
            <DropdownElement label="서종현" value="seo"/>
            <DropdownElement label="최지안" value="choi"/>
            <DropdownElement label="유재림" value="yu"/>
          </DropdownButton>
          <p style={{width: 200, textAlign: "right"}}>
            {selectedPerson ? `${selectedPerson.label} 선택됨` : "없음"}
          </p>
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
        <SegmentedGroup 
          name="segmentedGroup1" 
          defaultValue={selected} 
          onChange={setSelected}
          stretch
          >
          <SegmentedButton label="옵션 1" value="option1" />
          <SegmentedButton label="옵션 2" value="option2" />
          <SegmentedButton label="옵션 3" value="option3" />
          <SegmentedButton label="옵션 4" value="option4" />
        </SegmentedGroup>
        <SegmentedGroup 
          name="segmentedGroup1" 
          defaultValue={selected} 
          onChange={setSelected}
          ratios={[1, 2, 3, 4]}
          stretch
          >
          <SegmentedButton label="옵션 1" value="option1" />
          <SegmentedButton label="옵션 2" value="option2" />
          <SegmentedButton label="옵션 3" value="option3" />
          <SegmentedButton label="옵션 4" value="option4" />
        </SegmentedGroup>
      </Column>
    </section>
  );
}

function textFields() {
  return (
    <section>
      <h2>Text Fields</h2>
      <Row>
        <TextField placeholder="Default" stretch />
        <TextField placeholder="Error" error stretch />
      </Row>
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

export default function Component() {
  return (
    <div className="page">
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
            {/* <div style={{height: "400px"}} /> */}
          </Column>
        </div>
      </Card>
    </div>
  );
}