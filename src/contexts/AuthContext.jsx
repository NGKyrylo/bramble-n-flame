import { createContext, useContext, useState, useEffect } from "react";
// import { useCart } from "./CartContext"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // const [userId, setUserId] = useState(null);
    // const { cart, setCart } = useCart();
    // const [accessToken, setAccessToken] = useState(null);
    const [avatarSrc, setAvatarSrc] = useState(null);

    // const isAuth = !!accessToken;
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getAvatar = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/avatar`, {
                    method: 'GET',
                    credentials: 'include',
                    signal,
                })

                if (!response.ok) {
                    setIsAuth(false);
                    return;
                    // return false;
                }

                const data = await response.json();

                setAvatarSrc(data.avatarSrc);
                setIsAuth(true);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Avatar fetch error:', error);
                    setIsAuth(false);
                }
            }
        }

        getAvatar();

        return () => {
            controller.abort();
        };
    }, []);

    // login({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    const login = async ({ avatarSrc }) => {
        // setAccessToken(accessToken);
        setIsAuth(true);
        setAvatarSrc(avatarSrc);
        // localStorage.setItem("accessToken", accessToken);

        // Merge local cart with user cart
        // and replace the local cart with the merged cart in CartContext and localStorage
    }

    const logout = () => {
        // setAccessToken(null);
        setIsAuth(false);
        setAvatarSrc(null);
        fetch(`${import.meta.env.VITE_API_URL}/user/logout`, { method: 'POST', credentials: 'include' });

        // setUserId(null);
        // localStorage.removeItem("userId");
        // setCart([]);
        // localStorage.removeItem("cart");
    }

    return (
        <AuthContext.Provider value={{ avatarSrc, setAvatarSrc, isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


// const refreshToken = async () => {
//     try {
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/user/refresh`, {
//             method: 'POST',
//             credentials: 'include',
//         });

//         if (!response.ok) {
//             setIsAuth(false);
//             return false;
//         }

//         const data = await response.json();
//         // if (response.ok && data.accessToken) {
//         setIsAuth(true);
//         return true;

//     } catch (error) {
//         // setIsAuth(false);
//         console.error('Token refresh error: ', error);
//         return false;
//     }
// }