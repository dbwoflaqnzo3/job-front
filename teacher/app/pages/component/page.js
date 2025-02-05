'use client'
import { useState } from "react";
import { RadioButton, RadioGroup } from "@/app/components/RadioButton";
import { CheckboxButton, CheckboxGroup } from "@/app/components/CheckboxButton";
import { Row, Column } from "@/app/widgets/structure/Grid";
import { Button1, Button2, Button3, Button4, Button5, Button6 } from "@/app/components/Button";
import TextField from "@/app/components/TextField";
import DropdownButton from "@/app/components/DropdownButton";
import { SemiCircularGraph, CircularGraph } from "@/app/components/CircularGraph";

function buttons() {
  return (
    <section>
      <h2>Buttons</h2>
      <Column>
        <Row><Button1 text="Button 1 Default" disabled/><Button1 text="Button 1 Disabled" disabled /></Row>
        <Row><Button2 text="Button 2 Default" /><Button2 text="Button 2 Disabled" disabled /></Row>
        <Row><Button3 text="Button 3 Default" /><Button3 text="Button 3 Disabled" disabled /></Row>
        <Row><Button4 text="Button 4 Default" /><Button4 text="Button 4 Disabled" disabled /></Row>
        <Row><Button5 text="Search" /><Button5 text="Search" disabled /></Row>
        <Row><Button6 text="Button 6 Default" /><Button6 text="Button 5 Disabled" disabled /></Row>
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
          <Row>          
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
  
  return (
    <section>
      <h2>Dropdown Buttons</h2>
      <Column>
        <Row>
          <DropdownButton
            list={[
              { label: "옵션 1", value: "option1" },
              { label: "옵션 2", value: "option2" },
              { label: "옵션 3", value: "option3" },
            ]}
            onSelect={(item) => setSelectedOption(item)}
          />
          <p>{selectedOption ? `${selectedOption.label} 선택됨` : "없음"}</p>
        </Row>
        <Row>
          <DropdownButton
            list={[
              { label: "반대준", value: "ban" },
              { label: "서종현", value: "seo" },
              { label: "최지안", value: "choi" },
              { label: "유재림", value: "yu" },
            ]}
            onSelect={(item) => setSelectedPerson(item)}
            allowCustom={true}
          />
          <p>{selectedPerson ? `${selectedPerson.label} 선택됨` : "없음"}</p>
        </Row>
      </Column>
    </section>
  );
}

function textFields() {
  return (
    <section>
      <h2>Text Fields</h2>
      <Row>
        <TextField placeholder="Default"/>
        <TextField placeholder="Error" state="error" />
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
    <Column>
      {buttons()}
      {radioButtons()}
      {checkboxButtons()}
      {dropdownButtons()}
      {textFields()}
      {circulargraphes()}
      <div style={{height: "400px"}} />
    </Column>
  );
}