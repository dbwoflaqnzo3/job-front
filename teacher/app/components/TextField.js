'use client'
import "./textField.css";

export default function TextField({ 
  placeholder,
  type = "text",
  state = "default",
}) {
  
  return (
    <input 
      className={`text-field ko-md-15 ${state}`}
      type={type} 
      placeholder={placeholder} 
    />
  );
}
