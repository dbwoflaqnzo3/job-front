'use client';

import { useState, useRef, useEffect } from "react";
import { containsHangeul, containsChoseong, isHangeul } from "@/app/utils/hangeul";
import ArrowIcon from "@/public/assets/images/icons/dropdownArrow.svg";
import "./dropdownButton.css";

export default function DropdownButton({ 
  list = [], 
  onSelect, 
  placeholder = "옵션 선택", 
  width = "200px",
  allowCustom = false,
}) {
  const [state, setState] = useState("default");
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  
  let filteredList = list.filter((item) => {
    const query = searchQuery.toLowerCase();
    const label = item.label.toLowerCase();
    if (isHangeul(query)) {
      if (containsHangeul(label, query)) return true;
      if (containsChoseong(label, query)) return true;
    }
    return label.includes(query);
  }
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setState("");
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    setSearchQuery("");
    setState(null);
    if (onSelect) onSelect(item);
  };

  const toggleOpenState = () => { 
    if (state === "custom") return;
    setState(state === "opened" ? "default" : "opened"); 
  }
  const toggleCustomState = () => { 
    setState(state === "custom" ? "default" : "custom"); 
    setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 0);
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };


  const selectedWidget = <>
    {selected ? selected.label : placeholder}
    <div className="dropdown-arrow"><ArrowIcon /></div>
  </>;

  const textField = <input 
    ref={inputRef} 
    className="ko-md-15" 
    type="text" 
    placeholder="직접입력" 
    value={searchQuery}
    onChange={handleInputChange}
  />;

  const getElements = (l) => l.map((item) => (
    <li key={item.value} className="dropdown-item" onClick={() => handleSelect(item)}>
      {item.label}
    </li>
  ));

  const elements = <>
    {allowCustom ? <li className="dropdown-item custom-input" onClick={toggleCustomState}>직접입력</li> : undefined}
    {getElements(list)}
  </>;
  const filteredElements = filteredList.length > 0 
    ? getElements(filteredList) 
    : <li className="dropdown-item no-result">검색 결과 없음</li>;

  return (
    <div className={`dropdown-container ${state}`} ref={dropdownRef} style={{width: width}}>
      <button className="dropdown-button ko-md-15" onClick={toggleOpenState}>
        <span className="dropdown-button-inner">{state === "custom" ? textField : selectedWidget}</span>
      </button>
      <ul className={`dropdown-list ko-sb-15 ${state} ${searchQuery === "" ? "" : "typed"}`}>
        {state === "custom" ? filteredElements : elements}
      </ul>
    </div>
  );
}