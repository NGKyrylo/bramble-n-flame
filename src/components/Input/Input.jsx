import React, { useRef, useEffect, useState } from "react";
import styles from "./Input.module.css";

import Eye from "../../assets/Eye.svg";
import EyeOff from "../../assets/EyeOff.svg";

const Input = ({
  type = "text", // Тип поля
  label, // Текст для label
  placeholder, // Placeholder
  value, // Початкове значення
  onChange, // Обробник зміни
  options = [], // Варіанти для select
  resize = true, // Чи дозволено змінювати розмір (textarea)
  error = false, // Помилка (error)
  disabled = false, // Чи поле вимкнено
}) => {
  const textareaRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (
      textareaRef.current &&
      textareaRef.current.classList.contains(styles.autoResize)
    ) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef, value]);

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label
          className={`${styles.label} ${disabled ? styles.disabledLabel : ""}`}
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          ref={textareaRef}
          className={`${styles.textarea} 
            ${!resize
              ? styles.noResize
              : resize === "vertical"
                ? styles.verticalResize
                : resize === "horizontal"
                  ? styles.horizontalResize
                  : resize === "auto"
                    ? styles.autoResize
                    : ""
            } 
            ${error ? styles.errorBorder : ""}
            ${disabled ? styles.disabledField : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => !disabled && onChange && onChange(e.target.value)}
          disabled={disabled}
          rows={2}
        />
      ) : type === "select" ? (
        <select
          className={`${styles.select} 
            ${error ? styles.errorBorder : ""} 
            ${disabled ? styles.disabledField : ""}`}
          value={value}
          onChange={(e) => !disabled && onChange && onChange(e.target.value)}
          disabled={disabled}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "passwordEye" ? (
        <div className={`${styles.inputSubContainer} 
        ${error ? styles.errorBorder : ""} 
        ${disabled ? styles.disabledField : ""}`}>
          <input
            className={`${styles.inputInContainer} 
            ${error ? styles.errorBorder : ""} 
            ${disabled ? styles.disabledField : ""}`}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={(e) => !disabled && onChange && onChange(e.target.value)}
            disabled={disabled}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {!showPassword ? <Eye className={styles.eye}/> : <EyeOff className={styles.eye}/>}
          </button>
        </div>
      ) : (
        <input
          className={`${styles.input} 
            ${error ? styles.errorBorder : ""} 
            ${disabled ? styles.disabledField : ""}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => !disabled && onChange && onChange(e.target.value)}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default Input;
