"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { LoaderProvider, useLoader } from "@/contexts/LoaderContext";
import Loader from "../Loader/Loader";
import { SocketProvider } from "@/contexts/SocketContext";

export default function ClientWrapper({ children }) {

    const GlobalLoader = () => {
        const { loading } = useLoader();
        return loading ? <Loader /> : null;
    };

    return (
        <SocketProvider>
            <ThemeProvider>
                <AuthProvider>
                    <CartProvider>
                        <LoaderProvider>
                            <div id='root'>
                                <div className="app">
                                    <Header />
                                    <GlobalLoader />
                                    {children}
                                    <Footer />
                                </div>
                            </div>
                        </LoaderProvider>
                    </CartProvider>
                </AuthProvider>
            </ThemeProvider>
        </SocketProvider>
    );
}