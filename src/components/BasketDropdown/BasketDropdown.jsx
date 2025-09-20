import React, { useState } from "react";
import styles from './BasketDropdown.module.css';
import ProductImg from "../ProductImg/ProductImg.jsx";
import TrashIcon from '/src/assets/TrashIcon.svg';
import Button from "../Button/Button.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import { useRouter } from "next/navigation";

const BasketItem = ({ item, removeFromCart }) => (
    <div className={styles.basketItem} id={item.id}>
        <ProductImg src={item.image} size="small" />
        <div className={styles.basketItemInfo}>
            <p className={styles.basketItemName}>{item.name}</p>
            <div className={styles.basketInfo2Line}>
                {/* <p className={styles.peice}>£{(item.price * item.qty).toFixed(2)}</p> */}
                <p className={styles.price}>{item.oldPrice && item.oldPrice !== item.price && <span className={styles.basketItemOldPrice}>£{Number(item.oldPrice).toFixed(2)}</span>}£{Number(item.price).toFixed(2)}</p>
                <p className={styles.qty}>Qty: {item.qty}</p>
            </div>
            <div className={styles.trashContainer} onClick={() => removeFromCart(item)}>
                {item.promoBadge && <span className={styles.badgeText}>{item.promoBadge}</span>}
                <TrashIcon height={20} style={{ cursor: 'pointer' }} />
            </div>

        </div>
    </div>
);

// const BasketDropdown = ({ basketItems }) => {
const BasketDropdown = ({ hideDropdownFunction }) => {
    const router = useRouter();
    const { cart, addToCart, removeFromCart } = useCart();

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0.00);
    // const totalPrice = basketItems.reduce((acc, item) => acc + item.price, 0.00);

    return (
        <div className={styles.basketDropdown}>
            <p className={styles.basketHeader}>{cart.length === 0 ? "Your basket is empty" : "Shopping basket"}</p>

            {cart.length > 0 ? (
                <div>
                    {cart.map((item, index) => (
                        <BasketItem key={index} item={item} removeFromCart={removeFromCart} />
                    ))}
                </div>
            ) : (
                <div style={{ display: 'none' }}></div>
            )}

            {cart.length > 0 && (
                <div className={styles.total}>
                    <p>Total</p>
                    <p>£{totalPrice.toFixed(2)}</p>
                </div>
            )}

            <div className={styles.buttons}>
                <Button
                    variant="primary"
                    fullWidth
                    disabled={cart.length === 0}
                    onClick={() => {
                        router.push("/checkout");
                        hideDropdownFunction();
                    }}
                >
                    Checkout
                </Button>
                <Button
                    variant="neutral"
                    fullWidth
                    disabled={cart.length === 0}
                    onClick={() => {
                        router.push("/basket");
                        hideDropdownFunction();
                    }}
                >
                    View basket
                </Button>
            </div>
        </div>
    )
}

export default BasketDropdown;