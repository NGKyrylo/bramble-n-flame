'use client'
import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import ProductImg from "@/components/ProductImg/ProductImg";
import Loader from '@/components/Loader/Loader.jsx';

import { options } from "@/assets/Countries.jsx";

import { useTheme } from "@/contexts/ThemeContext.jsx";

import { toast } from 'react-toastify';

// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';

import { useRouter } from "next/navigation";

const Checkout = () => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const { isAuth } = useAuth();
    const { cart, reloadCartData, clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(true);
    const [productsInOrder, setProductsInOrder] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [freeDeliveryFrom, setFreeDeliveryFrom] = useState(0);

    const [discountData, setDiscountData] = useState({
        discount: null,
        discountCode: null,
    });

    const [totalSaving, setTotalSaving] = useState();
    const [itemsTotal, setItemsTotal] = useState();

    useEffect(() => {
        const reloadData = async () => {
            await reloadCartData();
            setIsLoading(false);
        }

        reloadData();
    }, []);

    useEffect(() => {
        // let total = 0;
        // let items = 0;
        // cart.forEach((item) => {
        //     total += item.price * item.qty;
        //     items += Number(item.qty);
        // });
        // setTotal(total);
        // setItems(items);
        const controller = new AbortController();
        const signal = controller.signal;

        const verifyOrder = async () => {
            try {
                const products = cart.map(item => { return { slug: item.id, quantity: item.qty } })

                const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/verify`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ products }),
                    signal,
                });

                const data = await resp.json();

                if (resp.ok) {
                    setProductsInOrder(data.products);
                    setTotal(data.total);
                    setItems(data.items);
                    setSubtotal(data.subtotal);
                    setDelivery(data.delivery);
                    setFreeDeliveryFrom(data.freeDeliveryFrom);
                    setTotalSaving(data.totalSaving);
                    setItemsTotal(data.itemsTotal);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Failed to verify order:", error);
                }
            }
        }

        verifyOrder();

        return () => {
            controller.abort();
        };
    }, [cart]);

    const [payWithFormData, setPayWithFormData] = useState({
        // cardNumber: "",
        // expiryDate: "",
        // securityCode: "",
        firstName: "",
        surename: "",
    });
    const [postToFormData, setPostToFormData] = useState({
        country: "GB",
        street: "",
        street2: "",
        city: "",
        region: "",
        postcode: "",
        email: "",
    });

    // const [payWithFormData, setPayWithFormData] = useState({
    //     firstName: "Oliver",
    //     surename: "Smith",
    // });
    // const [postToFormData, setPostToFormData] = useState({
    //     country: "GB",
    //     street: "221B Baker Street",
    //     street2: "Flat 2A",
    //     city: "London",
    //     region: "Greater London",
    //     postcode: "NW1 6XE",
    //     email: "kirill.eremenko2016.gd@gmail.com",
    // });
    const [promoCodeFieldData, setPromoCodeFieldData] = useState("");

    const [errors, setErrors] = useState({
        firstName: false,
        surename: false,
        street: false,
        city: false,
        region: false,
        postcode: false,
        email: false,
    })

    // const formatCardNumber = (str) => {
    //     return str.replace(/\D/g, '') // видаляє всі нецифрові символи
    //         .replace(/(\d{4})(?=\d)/g, '$1 ') // додає пробіл після кожних 4 цифр
    //         .slice(0, 19); // обмежує довжину до 19 символів (16 цифр + 3 пробіли)
    // };

    // const formatExpiryDate = (str) => {
    //     return str.replace(/\D/g, '') // видаляє нецифрові символи
    //         .replace(/(\d{2})(\d{2})/, '$1/$2') // форматує як MM/YY
    //         .slice(0, 5); // обмежує довжину до 5 символів (MM/YY)
    // };

    // const formatSecurityCode = (str) => {
    //     return str.replace(/\D/g, '') // видаляє нецифрові символи
    //         .slice(0, 4); // обмежує довжину до 3 символів
    // };

    // const handlePayFormInput = (value, fieldName) => {
    //     let formattedValue = value;

    //     if (fieldName === 'cardNumber') {
    //         formattedValue = formatCardNumber(value);
    //     } else if (fieldName === 'expiryDate') {
    //         formattedValue = formatExpiryDate(value);
    //     } else if (fieldName === 'securityCode') {
    //         formattedValue = formatSecurityCode(value);
    //     }

    //     setPayWithFormData({
    //         ...payWithFormData,
    //         [fieldName]: formattedValue,
    //     });
    // }

    const [cardError, setCardError] = useState(false);
    const [expiryError, setExpiryError] = useState(false);
    const [cvcError, setCvcError] = useState(false);

    const [isCardNumberEmpty, setIsCardNumberEmpty] = useState(true);
    const [isExpiryEmpty, setIsExpiryEmpty] = useState(true);
    const [isCvcEmpty, setIsCvcEmpty] = useState(true);

    const [clientSecret, setClientSecret] = useState(null);

    const handleConfirmAndPay = async () => {
        const validatePostToForm = () => {
            const newErrors = {
                firstName: !payWithFormData.firstName,
                surename: !payWithFormData.surename,
                street: !postToFormData.street,
                city: !postToFormData.city,
                region: !postToFormData.region,
                postcode: !postToFormData.postcode,
                email: !postToFormData.email,
            };
            setErrors(prev => ({ ...prev, ...newErrors }));
            return !Object.values(newErrors).some(Boolean);
        };

        if (!validatePostToForm() ||
            cardError || expiryError || cvcError ||
            isCardNumberEmpty || isExpiryEmpty || isCvcEmpty) {
            const stripeErrors = {
                cardError: isCardNumberEmpty || cardError,
                expiryError: isExpiryEmpty || expiryError,
                cvcError: isCvcEmpty || cvcError,
            };

            setCardError(stripeErrors.cardError);
            setExpiryError(stripeErrors.expiryError);
            setCvcError(stripeErrors.cvcError);

            return toast.error('Please fill in all required fields correctly.');
        }

        setIsProcessing(true);
        const toastId = toast.loading('Processing...');

        const confirmStripePayment = async (secret) => {
            const { error, paymentIntent } = await stripe.confirmCardPayment(secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: payWithFormData.firstName + ' ' + payWithFormData.surename,
                        email: postToFormData.email,
                    },
                },
            });

            if (error) {
                toast.update(toastId, {
                    render: error.message,
                    type: 'error',
                    isLoading: false,
                    autoClose: 5000,
                });
                setIsProcessing(false);
            }

            if (paymentIntent?.status === 'succeeded') {
                clearCart();
                toast.update(toastId, {
                    render: 'Success payment',
                    type: 'success',
                    isLoading: false,
                    autoClose: 5000,
                });

                // Конверсія Google Ads з використанням publicId
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'conversion', {
                        'send_to': 'AW-17468413037/8uERCJjQqIUbEO2oy4lB',
                        'transaction_id': paymentIntent.metadata.publicId
                    });
                }

                router.push('/thank-you');
            }
        }

        try {
            if (!clientSecret) {
                const cartData = cart.map(item => { return { slug: item.id, quantity: item.qty } });
                const deliveryInfo = {
                    name: payWithFormData.firstName,
                    surname: payWithFormData.surename,
                    email: postToFormData.email,
                    country: postToFormData.country,
                    city: postToFormData.city,
                    region: postToFormData.region,
                    street: postToFormData.street,
                    street2: postToFormData.street2,
                    postcode: postToFormData.postcode,
                }
                const totals = {
                    subtotal,
                    delivery,
                    total,
                    promoCode: discountData.discountCode,
                }

                // console.log({ cart, deliveryInfo, totals })

                const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/payment-intent`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ cart: cartData, deliveryInfo, totals }),
                });

                const data = await resp.json();

                if (resp.ok) {
                    setClientSecret(data.clientSecret);
                    await confirmStripePayment(data.clientSecret);
                } else {
                    toast.update(toastId, {
                        render: data.message || 'Payment failed. Please try again.',
                        type: 'error',
                        isLoading: false,
                        autoClose: 5000,
                    });
                    return;
                }
            } else {
                await confirmStripePayment(clientSecret);
            }
        } catch (error) {
            toast.update(toastId, {
                render: 'Server error: ' + error.message || 'Payment failed. Please try again.',
                type: 'error',
                isLoading: false,
                autoClose: 5000,
            });
        } finally {
            setIsProcessing(false);
        }
    }

    const [isSuccessCode, setIsSuccessCode] = useState(null);   // стосовно промокоду

    const [stripeOptions, setStripeOptions] = useState({});

    const { theme } = useTheme();

    useEffect(() => {
        const timeout = setTimeout(() => {
            const rootStyles = getComputedStyle(document.documentElement);

            setStripeOptions({
                style: {
                    base: {
                        color: rootStyles.getPropertyValue('--text-default-primary').trim(),
                        backgroundColor: rootStyles.getPropertyValue('--input-bg').trim(),
                        fontSize: '16px',
                        fontFamily: `'Inter', sans-serif`,
                        '::placeholder': {
                            color: rootStyles.getPropertyValue('--text-placeholder')?.trim() || '#888',
                        },
                        ':-webkit-autofill': {
                            color: rootStyles.getPropertyValue('--text-default-primary').trim(),
                            backgroundColor: rootStyles.getPropertyValue('--input-bg').trim(),
                        }
                    },
                    invalid: {
                        color: rootStyles.getPropertyValue('--text-default-primary').trim(),
                    }
                }
            });
        }, 0);

        return () => clearTimeout(timeout);
    }, [theme]);

    const handleApplyPromocode = () => {
        if (promoCodeFieldData != "") {
            try {
                const promoCode = promoCodeFieldData.trim();
                const products = cart.map(item => { return { slug: item.id, quantity: item.qty } });

                const applyPromoCode = async () => {
                    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotions/apply-promo-code`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ products, promoCode }),
                    });
                    const data = await resp.json();

                    if (resp.ok) {
                        setDiscountData({
                            discount: data.promoDiscountPercent,
                            discountCode: promoCode,
                        });
                        setIsSuccessCode(true);
                        setTotal(data.total);
                        setItems(data.items);
                        setSubtotal(data.subtotal);
                        setDelivery(data.delivery);
                        setFreeDeliveryFrom(data.freeDeliveryFrom);
                        setTotalSaving(data.totalSaving);
                        setItemsTotal(data.itemsTotal);
                    } else {
                        setIsSuccessCode(false);
                        // toast.error(data.message || 'Failed to apply promo code. Please try again.');
                    }
                }

                applyPromoCode();
            } catch (error) {
                console.error("Failed to apply promo code:", error);
                toast.error('Failed to apply promo code. Please try again.');
                setIsSuccessCode(false);
            }
        }
    }

    return (
        isLoading ? (
            <main className={styles.main} >
                <Loader />
            </main >
        ) : (
            <main className={styles.main}>
                <div className={styles.leftSideCaontainer}>
                    <div className={styles.boxContainer}>
                        <h1>Pay With</h1>
                        <div className={styles.formContainer}>
                            {/* <div className={styles.formLineContainer}>
                                <Input
                                    label="Card number"
                                    value={payWithFormData.cardNumber}
                                    onChange={(e) => handlePayFormInput(e, 'cardNumber')}
                                />
                            </div>
                            <div className={styles.formLineContainer}>
                                <Input
                                    label="Expiry date"
                                    value={payWithFormData.expiryDate}
                                    onChange={(e) => handlePayFormInput(e, 'expiryDate')}
                                />
                                <Input
                                    label="Security code"
                                    placeholder="3 or 4 digits"
                                    value={payWithFormData.securityCode}
                                    onChange={(e) => handlePayFormInput(e, 'securityCode')}
                                />
                            </div> */}
                            <div className={styles.formLineContainer}>
                                <div className={styles.cardInput}>
                                    <label>Card number*</label>
                                    <div className={`${styles.strypeInputWrapper} ${cardError ? styles.error : ""}`}>
                                        <CardNumberElement options={stripeOptions} onChange={(event) => {
                                            setCardError(event.error ? true : false);
                                            setIsCardNumberEmpty(event.empty);
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.formLineContainer}>
                                <div className={styles.cardInput}>
                                    <label>Expiry date*</label>
                                    <div className={`${styles.strypeInputWrapper} ${expiryError ? styles.error : ""}`}>
                                        <CardExpiryElement options={stripeOptions} onChange={(event) => {
                                            setExpiryError(event.error ? true : false);
                                            setIsExpiryEmpty(event.empty);
                                        }} />
                                    </div>
                                </div>
                                <div className={styles.cardInput}>
                                    <label>CVC*</label>
                                    <div className={`${styles.strypeInputWrapper} ${cvcError ? styles.error : ""}`}>
                                        <CardCvcElement options={stripeOptions} onChange={(event) => {
                                            setCvcError(event.error ? true : false);
                                            setIsCvcEmpty(event.empty);
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.formLineContainer}>
                                <Input
                                    label="First name*"
                                    value={payWithFormData.firstName}
                                    onChange={(e) => setPayWithFormData({
                                        ...payWithFormData,
                                        firstName: e,
                                    })}
                                    error={errors.firstName}
                                />
                                <Input
                                    label="Surname*"
                                    value={payWithFormData.surename}
                                    onChange={(e) => setPayWithFormData({
                                        ...payWithFormData,
                                        surename: e,
                                    })}
                                    error={errors.surename}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.hr}></div>
                    <div className={styles.boxContainer}>
                        <h1>Post to</h1>
                        <div className={styles.formContainer}>
                            <div className={styles.formLineContainer}>
                                <div className={styles.selectCountry}>
                                    <Input
                                        type="select"
                                        label="Country*"
                                        options={options}
                                        value={postToFormData.country}
                                        onChange={(e) => setPostToFormData({
                                            ...postToFormData,
                                            country: e,
                                        })}
                                    />
                                </div>
                                {postToFormData.country == 'RU' && (
                                    <p className={styles.issueText}>We have a strict 'No Orcs' policy. Try Mordor instead.</p>
                                ) || postToFormData.country != 'GB' && (
                                    <p className={styles.issueText}>Sorry, we do not operate outside the United Kingdom.</p>
                                )}
                            </div>
                            <div className={styles.formLineContainer}>
                                <Input
                                    label="Street address*"
                                    value={postToFormData.street}
                                    onChange={(e) => setPostToFormData({
                                        ...postToFormData,
                                        street: e,
                                    })}
                                    error={errors.street}
                                />
                                <Input
                                    label="Street address 2 (optional)"
                                    value={postToFormData.street2}
                                    onChange={(e) => setPostToFormData({
                                        ...postToFormData,
                                        street2: e,
                                    })}
                                />
                            </div>
                            <div className={styles.formLineContainer}>
                                <Input
                                    label="City*"
                                    value={postToFormData.city}
                                    onChange={(e) => setPostToFormData({
                                        ...postToFormData,
                                        city: e,
                                    })}
                                    error={errors.city}
                                />
                                <Input
                                    label="Region*"
                                    value={postToFormData.region}
                                    onChange={(e) => setPostToFormData({
                                        ...postToFormData,
                                        region: e,
                                    })}
                                    error={errors.region}
                                />
                            </div>
                            <div className={styles.formLineContainer}>
                                <Input
                                    label="Postcode*"
                                    value={postToFormData.postcode}
                                    onChange={(e) => setPostToFormData({
                                        ...postToFormData,
                                        postcode: e,
                                    })}
                                    error={errors.postcode}
                                />
                                <Input
                                    type="email"
                                    label="Email*"
                                    value={postToFormData.email}
                                    onChange={(e) => setPostToFormData({
                                        ...postToFormData,
                                        email: e,
                                    })}
                                    error={errors.email}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.hr}></div>
                    <div className={styles.boxContainer}>
                        <h1>Add promo code</h1>
                        <div className={styles.formContainer}>
                            <div className={styles.formLineContainer}>
                                <Input
                                    type="text"
                                    value={promoCodeFieldData}
                                    onChange={(e) => setPromoCodeFieldData(e)}
                                    disabled={isSuccessCode === true}
                                />
                                <Button
                                    size="small"
                                    onClick={handleApplyPromocode}
                                    disabled={isSuccessCode === true}
                                >
                                    Apply
                                </Button>
                                {isSuccessCode === true ? (
                                    <p className={styles.successCode}>Success</p>
                                ) : isSuccessCode === false ? (
                                    <p className={styles.wrongCode}>Wrong Code</p>
                                ) : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.hr}></div>
                    <div className={styles.boxContainer}>
                        <h1>Review order</h1>
                        <div className={styles.basketItemsContainer}>
                            {productsInOrder.map((item, index) => (
                                <div key={index} className={styles.basketItem}>
                                    <ProductImg src={item.image} size="small" />
                                    <div className={styles.basketItemInfo}>
                                        <div className={styles.basketItemDetails}>
                                            <p className={styles.basketItemName}>
                                                <span>{item.name}</span>
                                            </p>
                                            {/* <p className={styles.basketItemPrice}>£{(item.price * item.qty).toFixed(2)}</p> */}
                                            <div className={styles.pricesContainer}>
                                                <p className={styles.basketItemPrice}>{item.oldPrice && item.oldPrice !== item.price && <span className={styles.basketItemOldPrice}>£{Number(item.oldPrice).toFixed(2)}</span>}£{Number(item.price).toFixed(2)}</p>
                                            </div>
                                            <div className={styles.selectContainer}>
                                                <p>Qty: {item.quantity}</p>
                                            </div>
                                            {item.badge &&
                                                <div className={styles.badgeText}>{item.badge}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.summaryContainer}>
                    <div className={styles.basketSummary}>
                        <div className={styles.summaryTextContainer}>
                            <p className={styles.summaryText}>Items ({items}): <span>£{itemsTotal?.toFixed(2)}</span></p>
                            {totalSaving ? (<p className={styles.summaryText}>Promotions saving: <span>£-{totalSaving}</span></p>) : (null)}
                            {discountData?.discount && (<p className={styles.summaryText}>Promo code: <span>{discountData.discount * 100}%</span></p>)}
                            <p className={styles.summaryText}>Subtotal: <span>£{subtotal && subtotal.toFixed(2)}</span></p>
                            <p className={styles.summaryText}>Delivery: <span>£{delivery && delivery.toFixed(2)}</span></p>
                        </div>
                        <p className={styles.summaryTextTotal}>Total: <span>£{(total).toFixed(2)}</span></p>
                        <Button
                            variant="primary"
                            fullWidth
                            disabled={cart.length === 0 || postToFormData.country != 'GB' || isProcessing}
                            onClick={() => { handleConfirmAndPay() }}
                        >
                            {isProcessing ? 'Processing...' : 'Confirm and pay'}
                        </Button>
                    </div>
                    {delivery !== 0 &&
                        <p className={styles.deliveryAlert}>Free delivery on orders from £{freeDeliveryFrom.toFixed(2)}</p>
                    }
                </div>
            </main>
        )
    )
}

export default Checkout;