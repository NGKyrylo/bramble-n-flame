import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { isAuth } = useAuth();

    // useEffect(() => {
    //     const storedCart = localStorage.getItem("cart");
    //     if (storedCart) {
    //         setCart(JSON.parse(storedCart));
    //     }
    // }, []);

    useEffect(() => {
        if (isAuth) {
            // fetch cart from server
        } else {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(storedCart);
        }
    }, [isAuth]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, product];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });

        // якщо авторизован
        // додати у бд
    }

    const removeFromCart = (product) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== product.id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });

        // якщо авторизован
        // видалити з бд
    }

    const isInCart = (id) => cart.some((item) => item.id === id);

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");

        // якщо авторизован
        // видалити з бд
    }

    const changeQty = (id, qty) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === id) {
                    return { ...item, qty: Number(qty) };
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }

    const reloadCartData = async () => {
        if (isAuth) {
            // fetch from bd and compare with cart
        } else {
            // fetch costs of items from bd
        }

        const reloadCartData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/reload-cart-data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ products: cart }),
                });

                if (!response.ok) {
                    throw new Error('Failed to reload cart data');
                }

                const data = await response.json();

                setCart((prevCart) => {
                    const updatedCart = prevCart.map(item => {
                        // Find matching product from API response
                        const updatedProduct = data.products.find(p => p.id === item.id);
                        // If found, merge with existing item, preserving qty and order
                        return updatedProduct
                            ? { ...updatedProduct, qty: item.qty }
                            : item;
                    });
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    return updatedCart;
                });
            } catch (error) {
                console.error('Error reloading cart data:', error);
            }
        }

        reloadCartData();
    }

    useEffect(() => {
        reloadCartData();
    }, []);

    // useEffect(() => {
    //     if (!isAuth) {
    //         setCart([]);
    //         localStorage.removeItem("cart");
    //     }
    // }, [isAuth]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, clearCart, changeQty, reloadCartData }}>
            {children}
        </CartContext.Provider>
    );
}