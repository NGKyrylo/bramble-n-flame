import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.css";
// import ArrowRightIcon from "../../assets/ArrowRightIcon.svg";
// import { ReactComponent as ArrowRightIcon } from "../../assets/ArrowRightIcon.svg";
import ArrowRightIcon from "../../assets/ArrowRightIcon.svg";


const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   if (totalPages && currentPage > totalPages) {
  //     // Якщо поточна сторінка більша за загальну кількість сторінок, то скидаємо її на останню
  //     setCurrentPage(1);
  //     onPageChange(1);
  //   }
  // }, [totalPages]);

  const handlePageClick = (page) => {
    // setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page); // Передаємо нову сторінку в батьківський компонент
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Завжди показуємо першу сторінку
    if (currentPage > 3) {
      pages.push(1);
    }

    // Показуємо "..." між першою сторінкою та поточними сторінками
    if (currentPage > 4) {
      pages.push("...");
    }

    // Показуємо 2 сторінки перед поточною та 2 сторінки після
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    // Показуємо "..." між останньою сторінкою та поточними сторінками
    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    // Завжди показуємо останню сторінку
    if (currentPage < totalPages - 2) {
      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      page === "..." ? (
        <span key={index} className={styles.ellipsis}>
          ...
        </span>
      ) : (
        <button
          key={index}
          className={`${styles.pageButton} ${
            currentPage === page ? styles.active : ""
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className={styles.pagesContainer}>
      <button
        className={styles.navButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ArrowRightIcon style={{ transform: "rotate(180deg)" }}/> Previous
        {/* <img src={ArrowRightIcon} alt="Previous" style={{ transform: "rotate(180deg)" }} /> Previous */}
      </button>
      {renderPageNumbers()}
      <button
        className={styles.navButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;

// &lt; &gt; 