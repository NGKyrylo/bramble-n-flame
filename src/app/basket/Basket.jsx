'use client'
import React, { useState, useEffect } from "react";
import styles from "./Basket.module.css";
import Button from "../../components/Button/Button";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input/Input";
import ProductImg from "../../components/ProductImg/ProductImg";
import TrashIcon from '/src/assets/TrashIcon.svg?react';

const Basket = () => {
    // const navigate = useNavigate();
    const router = useRouter();
    const { cart, removeFromCart, changeQty } = useCart();
    const { isAuth } = useAuth();
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState(0);

    const [isAlertDisplay, setIsAlertDispaly] = useState(false);

    useEffect(() => {
        let total = 0;
        let items = 0;
        cart.forEach((item) => {
            total += item.price * Number(item.qty);
            items += Number(item.qty);
        });
        setTotal(total);
        setItems(items);
    }, [cart]);

    const options = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
        { value: 10, label: "10" },
    ];

    return (
        <main className={styles.main}>
            <div className={styles.basketItemsContainer}>
                {cart.map((item, index) => (
                    <div key={index} className={styles.basketItem}>
                        <ProductImg src={item.image} size="small" />
                        <div className={styles.basketItemInfo}>
                            <div className={styles.basketItemDetails}>
                                <p className={styles.basketItemName}>
                                    <span onClick={() => router.push(`/product/${item.id}`)}>{item.name}</span>
                                </p>
                                <div className={styles.selectContainer}>
                                    <p>Qty</p>
                                    <Input type="select" options={options} value={item.qty} onChange={(val) => changeQty(item.id, val)} />
                                </div>
                                {/* <p className={styles.basketItemPrice}>£{(item.price * item.qty).toFixed(2)}</p> */}
                                <p className={styles.basketItemPrice}>{item.oldPrice && item.oldPrice !== item.price && <span className={styles.basketItemOldPrice}>£{Number(item.oldPrice).toFixed(2)}</span>}£{Number(item.price).toFixed(2)}</p>
                            </div>
                            <div className={styles.basketItemRemove}>
                                {/* <img src={TrashIcon} alt="Remove" className={styles.basketItemRemoveIcon} onClick={() => removeFromCart(item)} /> */}
                                {item.promoBadge && <span className={styles.badgeText}>{item.promoBadge}</span>}
                                <TrashIcon className={styles.basketItemRemoveIcon} onClick={() => removeFromCart(item)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.basketSummary}>
                <div className={styles.summaryTextContainer}>
                    <p className={styles.summaryText}>Items ({items}): <span>£{total.toFixed(2)}</span></p>
                </div>
                <p className={styles.summaryTextTotal}>Total: <span>£{total.toFixed(2)}</span></p>
                <Button variant="primary" fullWidth disabled={cart.length === 0} onClick={() => router.push("/checkout")}>Proceed to checkout</Button>
                {/* <Button variant="primary" fullWidth disabled={cart.length === 0} onClick={() => { isAuth ? navigate("/checkout") : setIsAlertDispaly(true) }}>Proceed to checkout</Button> */}
            </div>
            {isAlertDisplay && (
                <div className={styles.alertBackground}>
                    <div className={styles.alert}>
                        <div className={styles.alertTextContainer}>
                            <h1>Stay in Control of Your Order!</h1>
                            <p>Sign in to save your order history and track it anytime.</p>
                        </div>
                        <div className={styles.alertBtns}>
                            <Button size="small" onClick={() => router.push("/sign-in")}>Sign In</Button>
                            <Button size="small" variant="neutral" onClick={() => router.push("/checkout")}>Continue as Guest</Button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Basket;

