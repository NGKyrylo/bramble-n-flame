import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label, description, checked, onChange }) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkboxInput}
      />
      <div className={styles.customCheckbox}></div>
      <div className={styles.checkboxContent}>
        <span className={styles.label}>{label}</span>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </label>
  );
};

export default Checkbox;
