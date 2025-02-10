"use client";

import { useState, useRef, useEffect } from "react";
import { containsHangeul, containsChoseong, isHangeul } from "@/app/utils/hangeul";
import ArrowIcon from "@/public/assets/images/icons/dropdownArrow.svg";
import styles from "./dropdown.module.css"; // ✅ CSS Modules 적용

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
  });

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
    <div className={styles["dropdown-arrow"]}><ArrowIcon /></div>
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
    <li key={item.value} className={styles["dropdown-item"]} onClick={() => handleSelect(item)}>
      {item.label}
    </li>
  ));

  const elements = <>
    {allowCustom ? <li className={styles["dropdown-item"]} onClick={toggleCustomState}>직접입력</li> : undefined}
    {getElements(list)}
  </>;

  const filteredElements = filteredList.length > 0 
    ? getElements(filteredList) 
    : <li className={styles["dropdown-item"]}>{`검색 결과 없음`}</li>;

  return (
    <div className={`${styles["dropdown-container"]} ${styles[state]}`} ref={dropdownRef} style={{width: width}}>
      <button className={`${styles["dropdown-button"]} ko-md-15`} onClick={toggleOpenState}>
        <span className={styles["dropdown-button-inner"]}>{state === "custom" ? textField : selectedWidget}</span>
      </button>
      <ul className={`${styles["dropdown-list"]} ko-sb-15 ${styles[state]} ${searchQuery === "" ? "" : styles["typed"]}`}>
        {state === "custom" ? filteredElements : elements}
      </ul>
    </div>
  );
}