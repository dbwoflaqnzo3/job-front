"use client";

import { useState, useRef, Children, useEffect, cloneElement } from "react";
import { containsHangeul, containsChoseong, isHangeul } from "@/app/utils/hangeul";
import styles from "./dropdown.module.css";
import { Validator, ValidatorType } from "@/app/utils/validator";
import DynamicIcon from "@/app/components/ui/icon/Dynamic";

export function DropdownElement({ theme, label, value, onClick, type }) {
  return (
    <li className={`${styles["dropdown-item"]} ${styles[type]} ${styles[theme]}`} onClick={() => onClick({ label, value })}>
      {label}
    </li>
  );
}

export function DropdownButton({ 
  theme = "primary",
  children,
  onSelect, 
  placeholder = "옵션 선택", 
  width = 200,
  stretch = false,
  allowCustom = false,
  search = false,
  type,
  validator,
  paddingVertical,
  paddingHorizontal,
}) {
  const [state, setState] = useState("default");
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  width = stretch ? "100%" : width;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (state === "custom" && searchQuery.trim() !== "" && !error) {
          handleCustomInputSubmit();
        }
        setDropdownOpened(false);
        setSearchQuery("");
        setState("default");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery, state, error]);

  const handleSelect = (item) => {
    setSelected(item);
    setState("default");
    setError(false);
    setErrorMessage("");
    setSearchQuery("");
    if (onSelect) onSelect(item.label);
  };

  const toggleOpenState = () => { 
    if (state === "custom") return;
    setState(state === "opened" ? "default" : "opened"); 
  };

  const toggleCustomState = () => { 
    if (state === "opened") {
      setState("custom"); 
      setTimeout(() => inputRef.current?.focus(), 0);
    } else if (state === "custom") {
      handleCustomInputSubmit();
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
    if (event.key === "Enter") {
      handleCustomInputSubmit();
    }
  };

  const handleCustomInputSubmit = () => {
    if (search) return;
    if (searchQuery.trim() !== "" && !error) {
      const newValue = { label: searchQuery, value: searchQuery };
      setSelected(newValue);
      if (onSelect) onSelect(newValue.label);
      setState("default");
    } else {
      setSearchQuery(selected ? selected.label : "");
    }
    setTimeout(() => setDropdownOpened(false), 0);
  };

  const selectedWidget = (
    <>
      {selected ? selected.label : placeholder}
      <div className={styles["dropdown-arrow"]}>
        <DynamicIcon icon="arrowDown" size={24} />
      </div>
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
        onKeyDown={handleCustomKeyDown} 
      />
      <div className={`${styles["error-message"]} ${error ? "" : styles["hidden"]} ko-reg-13`}>{errorMessage}</div>
    </>
  );

  const elements = Children.map(children, (child) =>
    cloneElement(child, { 
      type: type,
      theme: child.props.theme || theme, 
      onClick: handleSelect, 
    })
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
      className={`${styles["dropdown-container"]} ${styles[state]} ${selected ? styles["selected"] : ""} ${styles[type]} ${styles[theme]}`}
      ref={dropdownRef} 
      style={{ 
        width,
        "--padding-vertical": `${paddingVertical}px`,
        "--padding-horizontal": `${paddingHorizontal}px`,
      }}
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

export const DropdownButton1 = (props) => (
  <DropdownButton {...props} type="button1" paddingVertical={8} paddingHorizontal={24}>{props.children}</DropdownButton>
);

export const DropdownButton2 = (props) => (
  <DropdownButton {...props} type="button2" paddingVertical={8} paddingHorizontal={16}>{props.children}</DropdownButton>
);

export function EmailDropdownButton1(props) {
  return (
    <DropdownButton1
      {...props}
      validator={ new Validator(ValidatorType.EMAIL_POSTFIX, "이메일 형식으로 입력하세요.") }
      allowCustom
    >
      <DropdownElement label="gmail.com" value="gmail"/>
      <DropdownElement label="naver.com" value="naver"/>
      <DropdownElement label="daum.net" value="daum"/>
      <DropdownElement label="apple.com" value="apple"/>
    </DropdownButton1>
  );
}