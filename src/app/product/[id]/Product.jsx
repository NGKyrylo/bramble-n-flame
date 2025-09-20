'use client';
import styles from "./Product.module.css";

import ProductImg from "@/components/ProductImg/ProductImg";
import RightArrowIcon from "@/assets/RightArrowIcon.svg?react";
import HeartIcon from "@/assets/HeartIcon.svg?react";
import HeartIconFilled from "@/assets/HeartIconFilled.svg?react";
import Input from "@/components/Input/Input.jsx";
import Button from "@/components/Button/Button.jsx";
import LatestReviews from "@/components/LatestReviews/LatestReviews.jsx";
import Loader from "@/components/Loader/Loader.jsx";
import defaultProductImg from '@/assets/DefaultProductImg.svg';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import useWindowWidth from "@/hooks/useWindowWidth";

import { useProductLogic } from './PageLogic.jsx';

const Product = ({ id }) => {
  const width = useWindowWidth();

  const {
    initialLoad,
    product,
    isLoading,
    selectedOption,
    setSelectedOption,
    options,
    isBtnActive,
    handleAddToBasket,
  } = useProductLogic({ id });

  const Arrow = ({ className, style, onClick }) => (
    <RightArrowIcon
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      viewBox="0 0 36 36"
    />
  );

  const settings = {
    // dots: width <= 768,
    dots: true,
    arrows: width > 768,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow className={styles.arrowLeft} />,
    prevArrow: <Arrow className={styles.arrowRight} />,
    // swipe: width <= 768,
  };

  if (isLoading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      {product &&
        <>
          <div className={styles.productContainer}>
            <div className={`${styles.productImages} ${initialLoad ? styles.tempFullWidth : ''}`}>
              <Slider {...settings} className={styles.slider}>
                {product.images && product.images.length > 0 ? product.images.map((image, index) => (
                  <div key={index} className={styles.imageWrapper}>
                    <ProductImg
                      key={index}
                      src={image}
                      alt="Product Image"
                      className={styles.productImage}
                      size="full"
                    />
                  </div>
                )) : (
                  <div className={styles.imageWrapper}>
                    <ProductImg
                      src={null}
                      alt="No Image Available"
                      className={styles.productImage}
                      size="full"
                    />
                  </div>
                )}
              </Slider>
            </div>

            <div className={styles.productInfoContainer}>
              <p className={styles.productName}>{product.name}</p>
              <div className={styles.productAddInfo}>
                <span>{product.collection}</span>
                <span>[{product.type}]</span>
              </div>
              <p className={`${styles.productQuantity} ${product.qty <= 10 ? styles.low : ""}`}>Qty: {product.qty}</p>
              <div className={styles.priceContainer}>
                <p className={styles.currency}>£</p>
                <p className={styles.productPrice}>{Number(product.price).toFixed(2)}</p>
                {product.oldPrice && (
                  <div className={styles.oldPriceContainer}>
                    <p className={styles.currencyOld}>£</p>
                    <p className={styles.productOldPrice}>{Number(product.oldPrice).toFixed(2)}</p>
                  </div>
                )}
              </div>
              {product.promoLabel && (
                <p className={styles.promoLabel}>
                  {product.promoLabel}
                </p>
              )}
              <p className={styles.productDescription}
                dangerouslySetInnerHTML={{ __html: product.description }} />
              <Input
                type="select"
                label="Quantity"
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
              {product.qty < selectedOption && (
                <p className={styles.warningMessage}>
                  <span className={styles.block}>Not enough in stock?</span>{' '}
                  <span className={styles.block}>No worries – we’ll handcraft it for you.</span>{' '}
                  <span className={styles.block}>Dispatch may take a little longer.</span>
                </p>
              )}
              <Button fullWidth onClick={handleAddToBasket} disabled={!isBtnActive}>{isBtnActive ? 'Add to Cart' : 'Already in Cart'}</Button>
            </div>
          </div>
          {/* <LatestReviews productId={id} /> */}
          {/* <p>Product ID: {id}</p> */}
        </>
      }
    </main>
  );
};

export default Product;
