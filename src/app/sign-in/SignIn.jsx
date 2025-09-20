'use client';
import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import styles from "./SignIn.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
// import { Route } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext.jsx';

import PageOverlay from "../../components/PageOverlay/PageOverlay.jsx";

const SignInForm = ({ formData, errors, handleChange, setIsSignInForm, handleSignIn }) => {
    return (
        <div className={styles.formContainer}>
            <div className={styles.form}>
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    error={errors.email}
                    value={formData.email}
                    onChange={(value) => handleChange("email", value)}
                />
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password}
                    value={formData.password}
                    onChange={(value) => handleChange("password", value)}
                />
                <Button type="submit" onClick={handleSignIn}>Sign In</Button>
                <p className={styles.forgotPassword} onClick={() => setIsSignInForm(false)}>
                    Forgot password?
                </p>
            </div>
        </div>
    );
};

const ForgotPasswordForm = ({ formData, errors, handleChange, setIsSignInForm, handleForgotPassword }) => {
    return (
        <div className={styles.formContainer}>
            <div className={styles.form}>
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    error={errors.email}
                    value={formData.email}
                    onChange={(value) => handleChange("email", value)}
                />
                <div className={styles.btnsContainer}>
                    <Button variant="neutral" onClick={() => setIsSignInForm(true)}>Cancel</Button>
                    <Button onClick={handleForgotPassword}>Reset password</Button>
                </div>
            </div>
        </div>
    );
};

// const SignIn = ({ setIsLoggedIn }) => {
const SignIn = () => {
    // const { token } = useParams();
    // const [isTokenVerified, setIsTokenVerified] = useState(false);
    const { isAuth, login } = useAuth();
    const router = useRouter();

    if (isAuth) {
        router.push("/");
    }

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const [infoMessage, setInfoMessage] = useState("");
    const [greenInfoMessage, setGreenInfoMessage] = useState('');

    // useEffect(() => {
    // if (token && !isTokenVerified) {
    //     setIsTokenVerified(true);
    //     const verifyAccount = async () => {
    //         try {
    //             const resp = await fetch(`${import.meta.env.VITE_API_URL}/user/verify/${token}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             const data = await resp.json();

    //             if (resp.ok) {
    //                 setGreenInfoMessage(data.message);
    //             } else {
    //                 setInfoMessage(data.message);
    //             }
    //         } catch (error) {
    //             setInfoMessage('Something went wrong');
    //             console.error('Registration error: ', error);
    //         }
    //     }

    //     verifyAccount();
    // }
    // }, [token, isTokenVerified])

    // const [searchParams] = useSearchParams();
    // const [successRegistration, setSuccessRegistration] = useState(searchParams.has("success-registration"));

    // if (searchParams.has("success-registration")) {
    //     setGreenInfoMessage('Registration was successful. <br />Check your email');
    // }

    const handleChangeForm = () => {
        setIsSignInForm((prev) => !prev);
        if (successRegistration) {
            setSuccessRegistration(false);
        }
    };

    // useEffect(() => {
    //     if (searchParams.has("success-registration")) {
    //         setGreenInfoMessage('Registration was successful. <br />Check your email');
    //         setTimeout(() => {
    //             window.history.replaceState(null, "", "/sign-in");
    //         }, 5000);
    //     }
    // }, []);

    useEffect(() => {
        setErrors({
            email: false,
            password: false,
        });
        setFormData({
            email: "",
            password: "",
        });
    }, [isSignInForm]);

    useEffect(() => {
        if (formData.email.length > 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: false,
            }));
        }

        if (formData.password.length > 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: false,
            }));
        }

        setInfoMessage("");

    }, [formData]);

    const validateSignIn = () => {
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

    const validateForgotPassword = () => {
        const newErrors = {};

        // Перевірка, чи поле email заповнене
        if (!formData.email.trim()) {
            newErrors.email = true; // Поле пусте — помилка
        } else {
            newErrors.email = false;
        }

        setErrors(newErrors);
        return !newErrors.email;
    };

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSignIn = async () => {      // Заглушено
        // if (validateSignIn()) {
        //     setInfoMessage("");
        //     setGreenInfoMessage('');

        //     const userData = {
        //         email: formData.email,
        //         password: formData.password,
        //     }

        //     try {
        //         const resp = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(userData),
        //             credentials: 'include',
        //         });

        //         const data = await resp.json();

        //         if (resp.ok) {
        //             // login({ accessToken: data.accessToken });
        //             login({ avatarSrc: data.avatarSrc })
        //             navigate("/");
        //         } else {
        //             setInfoMessage(data.message);
        //         }
        //     } catch (error) {
        //         setInfoMessage('Something went wrong');
        //         console.error('Login error: ', error);
        //     }
        // }
    }

    const handleForgotPassword = () => {        // Заглушено
        // if (validateForgotPassword()) {
        //     setInfoMessage("Check your email");
        // } else {
        //     setInfoMessage("Account not found");
        // }
    }

    return (
        <main className={styles.main}>
            <PageOverlay />
            {isSignInForm ? (
                <SignInForm
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    setIsSignInForm={handleChangeForm}
                    handleSignIn={handleSignIn}
                />
            ) : (
                <ForgotPasswordForm
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    setIsSignInForm={handleChangeForm}
                    handleForgotPassword={handleForgotPassword}
                />
            )}
            <p className={styles.infoText}>{infoMessage}</p>
            <p className={styles.greenInfoMessage} dangerouslySetInnerHTML={{ __html: greenInfoMessage }}></p>
        </main>
    );
};

export default SignIn;