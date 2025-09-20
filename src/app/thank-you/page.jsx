import React from "react";
import styles from "./ThankYou.module.css"
import Link from "next/link";

export const metadata = {
    title: "Bramble & Flame - Thank You",
    description: "Handcrafted soy wax candles inspired by Derbyshire. Vegan-friendly, cruelty-free, and made with love. Discover unique decorative candles for your home.",
    robots: "noindex, nofollow",
};

const ThankYou = () => {
    return (
        <main className={styles.main}>
            <h1>Thank you for your order</h1>
            <h2>Your order has been placed and is being processed.<br className={styles.br} />You will receive an email with the order details</h2>
            <Link href='/'>Back to home page</Link>
        </main>
    )
}

export default ThankYou;