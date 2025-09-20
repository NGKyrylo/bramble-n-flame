import React from "react";
import styles from "./ProductCard.module.css";
import ProductImg from "../ProductImg/ProductImg.jsx";
// import { Link, useNavigate } from "react-router-dom";
import Link from "next/link"
import { useRouter } from "next/navigation";

const ProductCard = ({ item, staticCard = false, ignoreRatio = false }) => {
    return(
        <Link className={`${styles.productCard} ${staticCard ? styles.staticCard : ""} ${ignoreRatio ? styles.ignoreRatio : ""}`} href={`/product/${item.slug}`} rel="noopener noreferrer">
            <ProductImg src={item.image} size="fill" className={styles.productImg}/>
            <div className={styles.productCardBody}>
                {item.promoBadge && <span className={styles.badgeText}>{item.promoBadge}</span>}
                <p className={styles.productName}>{item.name}</p>
                <p className={styles.productCost}>{item.oldPrice && item.oldPrice !== item.price && <span className={styles.basketItemOldPrice}>£{Number(item.oldPrice).toFixed(2)}</span>}£{Number(item.price).toFixed(2)}</p>
            </div>
        </Link>
    )
}

export default ProductCard