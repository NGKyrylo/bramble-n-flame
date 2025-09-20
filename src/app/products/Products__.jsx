'use client';
import { useState, useEffect, useRef, Suspense } from "react";
import styles from "./Products.module.css";
// import Input from "../../components/Input/Input";
// import Checkbox from "../../components/Checkbox/Checkbox";
// import SearchIcon from "../../assets/SearchIcon.svg?react";
// import CheckIcon from "../../assets/CheckIcon.svg?react";
// import Pagination from "../../components/Pagination/Pagination";
// import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
// import ToggleRightGripIcon from "../../assets/ToggleRightGripIcon.svg?react";

import ToggleRightGripIcon from "../../assets/ToggleRightGripIcon.svg?react";
import SearchIcon from "../../assets/SearchIcon.svg?react";
import Checkbox from "../../components/Checkbox/Checkbox";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import Pagination from "../../components/Pagination/Pagination";
import ProductCard from "../../components/ProductCard/ProductCard";

import { useProductsLogic } from "./PageLogic";

const Products = () => {
  const {
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
  } = useProductsLogic();

  const productsContainerRef = useRef(null);
  const [gap, setGap] = useState(24);

  const updateGap = () => {
    const container = productsContainerRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;

      const gap = containerWidth * 0.0224; // 2.24% ширини

      setGap(gap);
    }
  };

  useEffect(() => {
    updateGap();
    window.addEventListener("resize", updateGap); // Оновлюємо при зміні розміру
    return () => window.removeEventListener("resize", updateGap);
  }, []);

  return (
    <main className={styles.main}>
      {loading && <Loader />}
      <Suspense fallback={<Loader />}>
        <div className={`${styles.paramsPanel} ${isOpen ? styles.open : ''}`}>
          <div className={styles.settingsContainerInParams}>
            <div className={styles.search}>
              <input
                className={styles.searchInput}
                type="input"
                placeholder="Search — press Enter"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
              />
              <SearchIcon height={16} />
            </div>
            <div className={styles.sortBy}>
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.sortButton} ${selectedOption === option.value ? styles.active : ""
                    }`}
                  onClick={() => handleSelectOption(option.value)}
                >
                  {selectedOption === option.value && <CheckIcon height={16} />}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.allCategoriesContainer}>
            <div className={styles.standaloneContainer}>
              {standaloneCategories.map((category) => (
                <Checkbox
                  label={category.name}
                  checked={selectedStandalone.includes(category.id)}
                  onChange={() => handleStandaloneChange(category.id)}
                  key={category.id}
                />
              ))}
            </div>
            <div className={styles.categoriesContainer}>

              <div className={styles.categoryContainer}>
                <p className={styles.categoryName}>Collections</p>
                {collections.map((collection) => (
                  <Checkbox
                    label={collection.name.replace(/ ?Collection$/i, '')}
                    checked={selectedCollections.includes(collection.id)}
                    onChange={() => handleCollectionChange(collection.id)}
                    key={collection.id}
                  />
                ))}
              </div>

              <div className={styles.categoryContainer}>
                <p className={styles.categoryName}>Types</p>
                {productTypes.map((type) => (
                  <Checkbox
                    label={type.name}
                    checked={selectedProductTypes.includes(type.id)}
                    onChange={() => handleProductTypeChange(type.id)}
                    key={type.id}
                  />
                ))}
              </div>

              {parentCategories.map((category) => (
                <div className={styles.categoryContainer} key={category.id}>
                  <p className={styles.categoryName}>{category.name}</p>
                  {category.subcategories.map((subcategory) => (
                    <Checkbox
                      label={subcategory.name}
                      checked={selectedSubcategory.includes(subcategory.id)}
                      onChange={() => handleSubcategoryChange(subcategory.id)}
                      key={subcategory.id}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.paramsPanelToggleGrip}
            onClick={() => setIsOpen(prev => !prev)}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <ToggleRightGripIcon />
          </div>
        </div>
        <div className={styles.productsPanel}>
          <div className={styles.settingsContainer}>
            <div className={styles.search}>
              <input
                className={styles.searchInput}
                type="input"
                placeholder="Search — press Enter"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
              />
              <SearchIcon height={16} />
            </div>
            <div className={styles.sortBy}>
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.sortButton} ${selectedOption === option.value ? styles.active : ""
                    }`}
                  onClick={() => handleSelectOption(option.value)}
                >
                  {selectedOption === option.value && <CheckIcon height={16} />}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div
            className={styles.productsContainer}
            ref={productsContainerRef}
            style={{ gap: gap }}
          >
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                // <ProductCard key={index} item={product} staticCard />
                <ProductCard className={styles.productCard} key={index} item={product} />
              ))
            ) : (
              <Loader />
            )}
          </div>
          <div className={styles.pagesContainer} >
            {/* <Pagination totalPages={totalPages} onPageChange={handlePageChange} /> */}
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
          </div>
        </div>
      </Suspense>
    </main >
  );
};

export default Products;
