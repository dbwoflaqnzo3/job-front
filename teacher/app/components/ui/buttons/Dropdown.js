"use client";

import { useState, useRef, Children, useEffect, cloneElement } from "react";
import { containsHangeul, containsChoseong, isHangeul } from "@/app/utils/hangeul";
import ArrowIcon from "@/public/assets/images/icons/arrowDown.svg";
import styles from "./dropdown.module.css";

export function DropdownElement({ label, value, onClick, type }) {
  return (
    <li className={`${styles["dropdown-item"]} ${styles[type]}`} onClick={() => onClick({ label, value })}>
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
  search = false,
  type,
  validator,
}) {
  const [state, setState] = useState("default");
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpened(false);
        setSearchQuery("");
        setState("default");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (search) setDropdownOpened(searchQuery.trim() !== "");
  }, [searchQuery, search]);

  const handleSelect = (item) => {
    setSelected(item);
    setState("default");
    setError(null);
    setErrorMessage("");
    setTimeout(() => setSearchQuery(""), 0);
    if (onSelect) onSelect(item);
  };

  const toggleOpenState = () => { 
    if (state === "custom") return;
    setState(state === "opened" ? "default" : "opened"); 
  };
  
  const toggleCustomState = () => { 
    switch (state) {
      case "opened": 
        setState("custom"); 
        setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 0);
        break;
      case "custom":
        setState("default"); 
        setTimeout(() => { if (inputRef.current) inputRef.current.blur(); }, 0);
        break;
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    const isValid = validator?.isMatch(value) ?? true;
    const message = validator?.getGuide() ?? "";
    setError(!isValid);
    setErrorMessage(message);
  };
  
  const handleCustomKeyDown = (event) => {
    if (event.key !== "Enter") return;
    handleCustomInputSubmit();
  }

  const handleCustomInputBlur = () => {
    setTimeout(handleCustomInputSubmit, 0);
  };
  
  const handleCustomInputSubmit = () => {
    if (search) return;

    if (searchQuery.trim() !== "" && !error) {
      const newValue = { label: searchQuery, value: searchQuery };
      setSelected(newValue);
      if (onSelect) onSelect(newValue);
      toggleCustomState();
    }
    setTimeout(() => setDropdownOpened(false), 0);
  };

  const selectedWidget = (
    <>
      {selected ? selected.label : placeholder}
      <div className={styles["dropdown-arrow"]}><ArrowIcon /></div>
    </>
  );

  const textField = (
    <>
      <input 
        ref={inputRef} 
        className="ko-md-15" 
        type="text" 
        placeholder="직접입력" 
        value={searchQuery}
        onChange={handleInputChange}
        onBlur={handleCustomInputBlur} 
        onKeyDown={handleCustomKeyDown} 
      />
      <div className={`${styles["error-message"]} ${error ? "" : styles["hidden"]} ko-reg-13`}>{errorMessage}</div>
    </>
  );

  const elements = Children.map(children, (child) =>
    cloneElement(child, { onClick: handleSelect, type: type })
  );

  const filteredElements = search 
    ? elements?.filter((child) => {
        const query = searchQuery.toLowerCase();
        const label = child.props.label.toLowerCase();

        if (isHangeul(query)) {
          if (containsHangeul(label, query)) return true;
          if (containsChoseong(label, query)) return true;
        }

        return label.includes(query);
      })
    : elements;

  return (
    <div 
      className={`${styles["dropdown-container"]} ${styles[state]} ${selected ? styles["selected"] : ""} ${styles[type]}`} 
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
      <ul className={`${styles["dropdown-list"]} ko-sb-15 ${styles[state]} ${dropdownOpened ? styles["opened"] : ""}`}>
        {allowCustom && <li className={styles["dropdown-item"]} onClick={toggleCustomState}>직접입력</li>}
        {filteredElements.length > 0 
          ? filteredElements 
          : search 
            ? <li className={styles["dropdown-item"]}>{`검색 결과 없음`}</li>
            : elements
        }
      </ul>
    </div>
  );
}

export function DropdownButton1(props) {
  return <DropdownButton {...props} type="button1">{props.children}</DropdownButton>;
}
export function DropdownButton2(props) {
  return <DropdownButton {...props} type="button2">{props.children}</DropdownButton>;
}
