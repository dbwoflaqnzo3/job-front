"use client";
import React, { useMemo, useRef, useState, useEffect, cloneElement } from "react";
import { Row } from "@/app/widgets/structure/Grid";
import Logo from "@/public/assets/images/logo.svg";
import styles from "./nav.module.css";
import DynamicIcon from "@/app/components/ui/icon/Dynamic";

export function NavItem({ text, textColor = "black-1000", onClick }) {
  const style = { color: `var(--${textColor})` };
  return (
    <button className={`${styles["dropdown-item"]} ko-md-17`} style={style} onClick={onClick}>
      {text}
    </button>
  );
}

function NavBase({ title, icon, onClick, isSelected = false, children, isIcon = false, onMenuItemClick }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const hideTimeout = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const showMenu = () => {
    clearTimeout(hideTimeout.current);
    setMenuVisible(true);
  };

  const hideMenu = () => setMenuVisible(false);
  const delayedHideMenu = () => {
    hideTimeout.current = setTimeout(hideMenu, 100);
  };

  const hasMenu = React.Children.toArray(children).some((child) => child.type === NavItem);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`${styles["nav-element"]} ${isSelected ? styles["selected"] : ""}`}>
      {hasMenu ? (
        <div className={styles["dropdown-container"]} ref={menuRef} tabIndex={0}>
          <button
            className={isIcon ? styles["icon-button"] : styles["nav-button"]}
            ref={buttonRef}
            onMouseEnter={showMenu}
            onMouseLeave={delayedHideMenu}
            onClick={hasMenu ? null : onClick}
          >
            {isIcon && <DynamicIcon icon={icon} size={38}/>}
            {!isIcon && title}
          </button>
          <div
            className={`${styles["dropdown-menu"]} ${menuVisible ? styles["visible"] : ""}`}
            onMouseEnter={showMenu}
            onMouseLeave={hideMenu}
          >
            {React.Children.map(children, (child) =>
              cloneElement(child, {
                onClick: () => {
                  hideMenu();
                  onMenuItemClick();
                  child.props.onClick();
                },
              })
            )}
          </div>
        </div>
      ) : (
        <button className={isIcon ? styles["icon-button"] : styles["nav-button"]} onClick={onClick}>
          {isIcon && <DynamicIcon icon={icon} size={38} />}
          {!isIcon && title}
        </button>
      )}
    </div>
  );
}

export const NavIcon = (props) => <NavBase {...props} isIcon />;
export const NavTitle = (props) => <NavBase {...props} />;

export function NavGroup({ theme = "primary", children }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const styleVars = {
    "--background-color": `var(--${theme}-300)`,
    "--hovered-color": `var(--${theme}-200)`,
    "--selected-color": `var(--${theme}-100)`,
  };

  const renderChildren = () =>
    React.Children.map(children, (child, index) => {
      if ([NavTitle, NavIcon].includes(child.type)) {
        return cloneElement(child, {
          isSelected: selectedIndex === index,
          onClick: () => {
            if (child.props.children) return;
            setSelectedIndex(index);
            child.props.onClick?.();
          },
          onMenuItemClick: () => {
            if (!child.props.children) return;
            setSelectedIndex(index);
            child.props.onMenuItemClick?.();
          },
        });
      }
      return child;
    });

  const renderElements = () => renderChildren().filter((child) => child.type === NavTitle);
  const renderIcons = () => renderChildren().filter((child) => child.type === NavIcon);

  return (
    <div className={`${styles["nav-container"]} ko-sb-20`}>
      <Row gap={25}>
        <div>
          <Logo width={212} />
        </div>
        <nav className={styles["nav-bar"]} style={styleVars}>
          <Row justifyContent="space-between">
            <div><Row gap={30}>{renderElements()}</Row></div>
            <div><Row gap={30}>{renderIcons()}</Row></div>
          </Row>
        </nav>
      </Row>
    </div>
  );
}

export function TeacherNav() {
  return (
    <NavGroup theme="secondary">
      <NavTitle title="학생관리" />
      <NavTitle title="수업관리" />
      <NavTitle title="반 관리" />
      <NavTitle title="결제관리">
        <NavItem text="결제내역" onClick={() => {}} />
        <NavItem text="결제관리" onClick={() => {}} />
      </NavTitle>
      <NavIcon icon="help" onClick={() => {}} />
      <NavIcon icon="profile" onClick={() => {}}>
        <NavItem text="내 정보" onClick={() => {}} />
        <NavItem text="멤버십관리" onClick={() => {}} />
        <NavItem text="결제수단관리" onClick={() => {}} />
        <NavItem text="로그아웃" textColor="red-3" onClick={() => {}} />
      </NavIcon>
    </NavGroup>
  );
}