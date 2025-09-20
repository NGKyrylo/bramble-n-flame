"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from "./BestSellers.module.css";
import ProductCard from '@/components/ProductCard/ProductCard.jsx';

const BestSellers = ({ item }) => {
    // const [basketItems] = useState([
    //     { id: 1, name: 'Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text', image: null, price: 0.00 },
    //     { id: 1, name: 'Text', image: null, price: 0.00 },
    //     { id: 1, name: 'Text', image: null, price: 0.00 },
    //     { id: 1, name: 'Text', image: null, price: 0.00 },
    //     { id: 1, name: 'Text', image: null, price: 0.00 },
    //     { id: 1, name: 'Text', image: null, price: 0.00 },
    //     { id: 1, name: 'Text', image: null, price: 0.00 },
    //     { id: 1, name: 'Text', image: null, price: 0.00 },
    // ]);

    const [basketItems, setBasketItems] = useState([]);

    const [rowHeight, setRowHeight] = useState(null);
    const cardsContainerRef = useRef(null);

    const updateRowHeight = () => {
        const gridContainer = cardsContainerRef.current;
        if (gridContainer && gridContainer.firstElementChild) {
            setRowHeight(gridContainer.firstElementChild.offsetHeight);
        }
    };

    useEffect(() => {
        updateRowHeight();

        window.addEventListener('resize', updateRowHeight);

        const getBestSellers = async () => {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/best-sellers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (resp.ok) {
                    const data = await resp.json();
                    setBasketItems(data);
                }

            } catch (error) {
                console.error("Error getting best sellers:", error);
            }
        }

        getBestSellers();

        return () => {
            window.removeEventListener('resize', updateRowHeight);
        };

    }, []);

    // return (
    //     <div className={styles.body}>
    //         <p className={styles.header}>Best sellers</p>
    //         <div className={styles.backCardsContainer}>
    //             <div className={styles.cardsContainer}>
    //                 {basketItems.map((item, index) => (
    //                     <ProductCard key={index} item={item} />
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // )

    return (
        <div className={styles.body}>
            <p className={styles.header}>Best sellers</p>
            <div className={styles.cardsContainer} ref={cardsContainerRef}>

                {basketItems?.products?.slice(0, 6).map((item, index) => (
                    <ProductCard key={index} item={item} />
                ))}

                <div className={styles.lastTwoCards} style={{ height: rowHeight ? `${rowHeight}px` : 'auto' }}>
                    {basketItems?.products?.slice(-2).map((item, index) => (
                        <ProductCard key={index + 6} item={item} ignoreRatio />
                    ))}
                </div>

                {basketItems?.products?.slice(-2).map((item, index) => (
                    <ProductCard key={index + 6} item={item} />
                ))}
            </div>
        </div>
    )
}

export default BestSellers