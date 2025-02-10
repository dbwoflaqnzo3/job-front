"use client";

import { useState, useRef, Children, useEffect, cloneElement } from "react";
import { containsHangeul, containsChoseong, isHangeul } from "@/app/utils/hangeul";
import ArrowIcon from "@/public/assets/images/icons/dropdownArrow.svg";
import styles from "./dropdown.module.css";

export function DropdownElement({ label, value, onClick }) {
  return (
    <li className={styles["dropdown-item"]} onClick={() => onClick({ label, value })}>
      {label}
    </li>
  );
}

export function DropdownButton({ 
  children,
  onSelect, 
  placeholder = "옵션 선택", 
  width = 200,
  stretch = false,
  allowCustom = false,
}) {
  const [state, setState] = useState("default");
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  
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
  const elements = Children.map(children, (child) =>
    cloneElement(child, { onClick: handleSelect })
  );

  const filteredElements = elements?.filter((child) => {
    const query = searchQuery.toLowerCase();
    const label = child.props.label.toLowerCase();

    if (isHangeul(query)) {
      if (containsHangeul(label, query)) return true;
      if (containsChoseong(label, query)) return true;
    }

    return label.includes(query);
  });

  width = stretch ? "100%" : width;

  return (
    <div 
      className={`${styles["dropdown-container"]} ${styles[state]}`} 
      ref={dropdownRef} 
      style={{ width: stretch ? "100%" : width }}
    >
      <button 
        className={`${styles["dropdown-button"]} ko-md-15`} 
        onClick={toggleOpenState}
      >
        <span className={styles["dropdown-button-inner"]}>
            {state === "custom" ? textField : selectedWidget}
        </span>
      </button>
      <ul className={`${styles["dropdown-list"]} ko-sb-15 ${styles[state]} ${searchQuery === "" ? "" : styles["typed"]}`}>
        {allowCustom && <li className={styles["dropdown-item"]} onClick={toggleCustomState}>직접입력</li>}
        
        {filteredElements.length > 0 ? filteredElements : (
          <li className={styles["dropdown-item"]}>{`검색 결과 없음`}</li>
        )}
      </ul>
    </div>
  );
}