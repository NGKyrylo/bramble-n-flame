import React from "react";
import styles from "./Button.module.css";

const Button = ({
    variant = "primary",
    size = "medium",
    fullWidth = false,
    fullHeight = false,
    disabled = false,
    onClick,
    children
}) => {
    const buttonClass = `${styles.button} ${styles[variant]}  ${styles[size]} ${
        fullWidth ? styles.fullWidth : ""
    } ${fullHeight ? styles.fullHeight : ""}`;

    return(
        <button className={buttonClass} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button