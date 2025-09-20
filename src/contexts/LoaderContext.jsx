"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let timer;
        const start = Date.now();

        setLoading(true);
        timer = setTimeout(() => {
            const elapsed = Date.now() - start;
            const delay = Math.max(1000 - elapsed, 0);
            setTimeout(() => setLoading(false), delay);
        }, 10); // Запускаємо мінімальний таймер

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <LoaderContext.Provider value={{ loading }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);