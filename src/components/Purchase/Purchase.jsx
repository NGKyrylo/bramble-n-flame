import React, { useState, useEffect } from "react";
import styles from "./Purchase.module.css";
import ProductImg from "../ProductImg/ProductImg";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const fetchPurchase = async (purchaseId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const purchasedProduct = {
                image: null,
                quantity: Math.floor(Math.random() * 2) + 1,
                name: "Product Name",
                price: 50.00,
                quantity: 1,
                id: 1,
            }

            const products = [purchasedProduct, purchasedProduct]

            resolve({
                status: 'Paid',
                orderDate: '20 Jan, 2025',
                orderTotal: 50,
                discount: null,
                tracking: { code: 'FD434DR454', link: 'http://aaaaChtoTut.com' },
                products: products,
            })
        }, 1000)
    })
}

const Purchase = ({ purchaseId }) => {
    const navigate = useNavigate();
    const [purchaseData, setPurchaseData] = useState(null);

    const getPurchase = async () => {
        const data = await fetchPurchase(purchaseId);
        setPurchaseData(data);
    }

    useEffect(() => {
        getPurchase();
    }, []);

    if (purchaseData) {
        return (
            <div className={styles.purchaseContainer}>
                <p className={styles.status}>{purchaseData.status}</p>
                <div className={styles.purchaseInfoContainer}>
                    <p>Order date: {purchaseData.orderDate}</p>
                    <p>Order total: £{purchaseData.orderTotal.toFixed(2)}{purchaseData.discount != null ? ' - ' + purchaseData.discount * 100 + '% = £' + (purchaseData.orderTotal - purchaseData.orderTotal * purchaseData.discount).toFixed(2) : ''}</p>
                    <p>Order number: {purchaseId}</p>
                </div>
                {purchaseData.tracking.link != null ? (
                    <p className={styles.trackingInfo}>
                        Tracking page: <a className={styles.trackingInfoLink} href={purchaseData.tracking.link} target="_blank" rel="noopener noreferrer">{purchaseData.tracking.code}</a>
                    </p>
                ) : ''
                }
                {purchaseData.products.map((item, index) => (
                    <div className={styles.productContainer} key={index}>
                        <ProductImg src={item.image} />
                        <div className={styles.rightContainer}>
                            <div className={styles.productInfoContainer}>
                                <h1>{item.name}</h1>
                                <p>Unit price: £{item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div className={styles.btnsContainer}>
                                <Button
                                    variant="neutral"
                                    onClick={() => navigate("/product/" + item.id)}
                                >
                                    View item
                                </Button>
                                <Button
                                    variant="neutral"
                                    onClick={() => navigate(`/product/${purchaseId}/${item.id}`)}
                                >
                                    Write a product review
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Purchase