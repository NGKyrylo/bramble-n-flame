'use client'
import React, { useState, useEffect, useRef, lazy, Suspense, useMemo } from "react";
import { useSearchParams } from 'next/navigation';
import { useAbortController } from '../../hooks/useAbortController.jsx';
import { fetchParams, fetchProducts } from "./scripts.jsx";
import { useRouter } from "next/navigation";

export const useProductsLogic = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialParams = useMemo(() => {
        // Якщо searchParams ще не готовий, повертаємо дефолтні значення
        if (!searchParams) {
            return {
                currentPage: 1,
                searchQuery: "",
                selectedOption: "new",
                searchInput: "",
                selectedSubcategory: [],
                selectedStandalone: [],
                selectedProductTypes: [],
                selectedCollections: [],
            };
        }

        return {
            currentPage: Number(searchParams.get("page")) || 1,
            searchQuery: searchParams.get("search") || "",
            selectedOption: searchParams.get("sort") || "new",
            searchInput: searchParams.get("search") || "",
            selectedSubcategory: searchParams.get("categoriesSub")
                ? searchParams.get("categoriesSub").split(",").map(Number)
                : [],
            selectedStandalone: searchParams.get("categoriesStan")
                ? searchParams.get("categoriesStan").split(",").map(Number)
                : [],
            selectedProductTypes: searchParams.get("types")
                ? searchParams.get("types").split(",").map(Number)
                : [],
            selectedCollections: searchParams.get("collections")
                ? searchParams.get("collections").split(",").map(Number)
                : [],
        };
    }, [searchParams]);

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialParams.currentPage);
    const [searchQuery, setSearchQuery] = useState(initialParams.searchQuery);
    const [selectedOption, setSelectedOption] = useState(initialParams.selectedOption); // За замовченням "New"
    const [searchInput, setSearchInput] = useState(initialParams.searchInput);

    const [totalPages, setTotalPages] = useState(1);
    const [standaloneCategories, setStandaloneCategories] = useState([]);
    const [parentCategories, setParentCategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(initialParams.selectedSubcategory);
    const [selectedStandalone, setSelectedStandalone] = useState(initialParams.selectedStandalone);

    const [productTypes, setProductTypes] = useState([]);
    const [collections, setCollections] = useState([]);
    const [selectedProductTypes, setSelectedProductTypes] = useState(initialParams.selectedProductTypes);
    const [selectedCollections, setSelectedCollections] = useState(initialParams.selectedCollections);

    const options = [
        { label: "New", value: "new" },
        { label: "Price ascending", value: "price-asc" },
        { label: "Price descending", value: "price-desc" },
        // { label: "Rating", value: "rating" },
    ];


    const signalParams = useAbortController();

    useEffect(() => {
        const signal = signalParams;
        fetchParams({ setLoading, setStandaloneCategories, setParentCategories, setCollections, setProductTypes, signal });
    }, []);

    const signalProducts = useAbortController();

    useEffect(() => {
        const signal = signalProducts;
        // fetchProducts({ signal, selectedStandalone, selectedSubcategory, selectedOption, selectedCollections, selectedProductTypes, setProducts, setSearchParams, setTotalPages });
        fetchProducts({ search: searchQuery, page: currentPage, signal, selectedStandalone, selectedSubcategory, selectedOption, selectedCollections, selectedProductTypes, setProducts, setTotalPages, router })
    }, [
        currentPage,
        selectedOption,
        searchQuery,
        selectedSubcategory,
        selectedStandalone,
        selectedCollections,
        selectedProductTypes,
    ]);

    // Обробка зміни для Standalone Categories
    const handleStandaloneChange = (categoryId) => {
        setSelectedStandalone((prevState) => {
            if (prevState.includes(categoryId)) {
                return prevState.filter((id) => id !== categoryId); // Якщо вже вибрано, то знімаємо вибір
            } else {
                return [...prevState, categoryId]; // Якщо не вибрано, додаємо до масиву
            }
        });
        setTotalPages(1);
        setCurrentPage(1);
        // handleFetchProducts();
    };

    // Обробка зміни для Subcategories
    const handleSubcategoryChange = (subcategoryId) => {
        setSelectedSubcategory((prevState) => {
            if (prevState.includes(subcategoryId)) {
                return prevState.filter((id) => id !== subcategoryId);
            } else {
                return [...prevState, subcategoryId];
            }
        });
        setTotalPages(1);
        setCurrentPage(1);
        // handleFetchProducts();
    };

    const handleCollectionChange = (collectionId) => {
        setSelectedCollections((prevState) => {
            if (prevState.includes(collectionId)) {
                return prevState.filter((id) => id !== collectionId);
            } else {
                return [...prevState, collectionId];
            }
        });
        setTotalPages(1);
        setCurrentPage(1);
    }

    const handleProductTypeChange = (typeId) => {
        setSelectedProductTypes((prevState) => {
            if (prevState.includes(typeId)) {
                return prevState.filter((id) => id !== typeId);
            } else {
                return [...prevState, typeId];
            }
        });
        setTotalPages(1);
        setCurrentPage(1);
    }

    // пошук
    const handleSelectOption = (value) => {
        setSelectedOption(value);
        // setTotalPages(20)
        setTotalPages(1);
        setCurrentPage(1);
        // handleFetchProducts();
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setSearchQuery(e.target.value);
            // fetchTotalPages();
            setTotalPages(1);
            setCurrentPage(1);
            // handleFetchProducts();
        }
    };

    // обробка бокової панелі
    const [isOpen, setIsOpen] = useState(false);
    const startX = useRef(null);

    const handleMouseDown = (e) => {
        startX.current = e.clientX;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleMouseMove = (e) => {
        const diff = e.clientX - startX.current;
        detectSwipe(diff);
    };

    const handleTouchMove = (e) => {
        const diff = e.touches[0].clientX - startX.current;
        detectSwipe(diff);
    };

    const handleMouseUp = () => cleanup();
    const handleTouchEnd = () => cleanup();

    const detectSwipe = (diff) => {
        if (!isOpen && diff > 50) {
            setIsOpen(true);
            cleanup();
        } else if (isOpen && diff < -50) {
            setIsOpen(false);
            cleanup();
        }
    };

    const cleanup = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        startX.current = null;
    };


    // Стан для відстеження відкритих категорій
    const [openCategories, setOpenCategories] = useState([]);

    // Функція для переключення категорій
    const toggleCategory = (categoryId) => {
        setOpenCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };


    return {
        loading,
        products,
        currentPage,
        setCurrentPage,
        searchInput,
        setSearchInput,
        totalPages,
        standaloneCategories,
        parentCategories,
        selectedStandalone,
        selectedSubcategory,
        productTypes,
        collections,
        selectedProductTypes,
        selectedCollections,
        options,
        selectedOption,
        isOpen,
        setIsOpen,
        handleStandaloneChange,
        handleSubcategoryChange,
        handleCollectionChange,
        handleProductTypeChange,
        handleSelectOption,
        handleSearch,
        handleMouseDown,
        handleTouchStart,
        openCategories,
        toggleCategory,
    }
}