'use client';
import React, { useState } from "react";
import styles from "./Contact.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";

import PageOverlay from "../../components/PageOverlay/PageOverlay.jsx";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  const [checkbox, setChecked] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    message: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Перевірка, чи всі поля заповнені
    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = true; // Поле пусте — помилка
      } else {
        newErrors[field] = false;
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every(value => value === false);
  };

  const handleSubmit = () => {    // Заглушено
    // if (validateForm()) {
    //   setFormSubmitted(true);
    // }
  };


  const [acceptTerms, setAcceptTerms] = useState(false);
  return (
    <main className={styles.main}>
      <PageOverlay />
      <div className={styles.textContainer}>
        <p className={`${styles.bigText} ${formSubmitted ? styles.formSubmited : ""}`}>Tell us</p>
        <p className={styles.smallText}>
          {formSubmitted
            ? "Form submitted successfully.\nWe will get back to you soon!"
            : "how we can assist you!"}
        </p>
      </div>
      <div className={`${styles.formContainer} ${formSubmitted ? styles.formSubmited : ""}`}>
        <Input
          type="text"
          label="Name"
          placeholder="Value"
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
          error={errors.name}
        />
        <Input
          type="text"
          label="Surname"
          placeholder="Value"
          value={formData.surname}
          onChange={(value) => handleChange("surname", value)}
          error={errors.surname}
        />
        <Input
          type="text"
          label="Email"
          placeholder="Value"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          error={errors.email}
        />
        <Input
          type="textarea"
          label="Message"
          placeholder="Value"
          resize="auto"
          value={formData.message}
          onChange={(value) => handleChange("message", value)}
          error={errors.message}
        />

        <Button fullWidth onClick={handleSubmit}>Submit</Button>
      </div>
    </main>
  );
};

export default Contact;
