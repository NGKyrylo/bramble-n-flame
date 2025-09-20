'use client'
import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
// import { useNavigate } from "react-router-dom";

import PageOverlay from "../../components/PageOverlay/PageOverlay.jsx";

const Register = () => {
    // const navigate = useNavigate();
    const [infoMessage, setInfoMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordCondirm: "",
        formSubmitted: false,
    });

    const [errors, setErrors] = useState({
        name: false,
        surname: false,
        email: false,
        password: false,
        passwordCondirm: false,
    });

    const validateForm = () => {
        let isValidated = true;
        let error = "";
        Object.keys(formData).forEach((field) => {
            if (typeof formData[field] === "string" && !formData[field].trim()) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: true,
                }));
                isValidated = false;
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: false,
                }));
            }
        });

        // if (!formData.email.includes("@") && !!formData.email.trim()) {
        if (!formData.email.trim() || !formData.email.includes("@") || formData.email.indexOf("@") === formData.email.length - 1) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: true,
            }));
            error += "Email is not valid<br />";
            isValidated = false;
        }

        // if (formData.password !== formData.passwordCondirm && formData.password != "" && formData.passwordCondirm != "") {
        //     setErrors((prevErrors) => ({
        //         ...prevErrors,
        //         passwordCondirm: true,
        //     }));
        //     error += "Passwords do not match<br />";
        //     isValidated = false;
        // }

        if (formData.password != "" && (
            formData.password.length < 8 ||
            !/[A-Z]/.test(formData.password) ||
            !/[a-z]/.test(formData.password) ||
            !/[0-9]/.test(formData.password)
        )) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: true,
            }));
            error += "Password must contain at least 8 characters, including uppercase, lowercase letters and numbers<br />";
            isValidated = false;
        } else if (formData.password !== formData.passwordCondirm && formData.password != "" && formData.passwordCondirm != "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordCondirm: true,
            }));
            error += "Passwords do not match<br />";
            isValidated = false;
        }

        setInfoMessage(error);
        return isValidated;
    };

    const handleRegister = async () => {        // Заглушено
        // setInfoMessage("");
        // if (validateForm()) {
        //     const VITE_API_URL = import.meta.env.VITE_API_URL;

        //     const userData = {
        //         email: formData.email,
        //         password: formData.password,
        //         firstName: formData.name,
        //         surename: formData.surname,
        //     }

        //     try {
        //         const resp = await fetch(`${VITE_API_URL}/user/register`, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(userData),
        //         });

        //         const data = await resp.json();

        //         if (resp.ok) {
        //             navigate("/sign-in?success-registration");
        //         } else {
        //             setInfoMessage(data.message);
        //         }
        //     } catch (error) {
        //         setInfoMessage('Something went wrong');
        //         console.error('Registration error: ', error);
        //     }
        // }
    };

    return (
        <main className={styles.main}>
            <PageOverlay />
            <div className={styles.formContainer}>
                <div className={styles.form}>
                    <Input
                        type="text"
                        label="First name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(value) => setFormData({ ...formData, name: value })}
                        error={errors.name}
                    />
                    <Input
                        type="text"
                        label="Surname"
                        placeholder="Enter your surname"
                        value={formData.surname}
                        onChange={(value) => setFormData({ ...formData, surname: value })}
                        error={errors.surname}
                    />
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(value) => setFormData({ ...formData, email: value })}
                        error={errors.email}
                    />
                    <Input
                        type="passwordEye"
                        label="Password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(value) => setFormData({ ...formData, password: value })}
                        error={errors.password}
                    />
                    <Input
                        type="password"
                        label="Confirm password"
                        placeholder="Enter your password again"
                        value={formData.passwordCondirm}
                        onChange={(value) => setFormData({ ...formData, passwordCondirm: value })}
                        error={errors.passwordCondirm}
                    />
                    <Checkbox
                        label="I accept the Terms of Service"
                        description={
                            <>
                                You must agree to the{" "}
                                <a href="/document/Terms-of-Service" target="_blank" rel="noopener noreferrer">
                                    Terms of Service
                                </a>{" "}
                                to continue.
                            </>
                        }
                        checked={formData.checked}
                        onChange={(checked) => setFormData({ ...formData, formSubmitted: checked })}
                    />
                    <Button disabled={!formData.formSubmitted} onClick={handleRegister}>Register</Button>
                </div>
            </div>
            <p className={styles.infoText} dangerouslySetInnerHTML={{ __html: infoMessage }}></p>
        </main>
    )
};

export default Register;