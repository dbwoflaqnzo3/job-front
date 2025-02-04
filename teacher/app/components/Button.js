'use client'
import "./button.css";
import { useMemo } from "react";
import { Row } from "@/app/widgets/structure/Grid";
import dynamic from 'next/dynamic';

const getIconComponent = (icon) => {
  if (!icon) return null;
  return dynamic(() => import(`@/public/assets/images/icons/${icon}.svg`));
};

export default function Button({ 
  text,
  type,
  disabled = false, 
  icon = null,
  onClick,
}) {
  const IconComponent = useMemo(() => icon ? getIconComponent(icon) : null, [icon]);
  const iconWidget = IconComponent && <IconComponent className="button-icon" />;

  return (
    <button 
      className={`button ko-sb-18 ${type} ${disabled ? "disabled" : ""}`} 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <div className="button-children"><Row>{iconWidget}{text}</Row></div>
    </button>
  );
}

export const Button1 = (props) => <Button {...props} type="button1" />;
export const Button2 = (props) => <Button {...props} type="button2" />;
export const Button3 = (props) => <Button {...props} type="button3" />;
export const Button4 = (props) => <Button {...props} type="button4" />;
export const Button5 = (props) => <Button {...props} type="button5" icon="search" />;
export const Button6 = (props) => <Button {...props} type="button6" />;
