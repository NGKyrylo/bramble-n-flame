import { CSSTransition } from 'react-transition-group';
import { useRef } from "react";
import styles from "../Products.module.css";

const CategorySection = ({
    categoryId,
    categoryName,
    children,
    openCategories,
    toggleCategory
}) => {
    const isOpen = openCategories.includes(categoryId);
    const contentRef = useRef(null);

    return (
        <div className={styles.categoryContainer}>
            <div
                className={styles.categoryHeader}
                onClick={() => toggleCategory(categoryId)}
            >
                <p className={styles.categoryName}>{categoryName}</p>
                <span className={styles.toggleIcon}>
                    {isOpen ? '▲' : '▼'}
                </span>
            </div>

            <CSSTransition
                nodeRef={contentRef}
                in={isOpen}
                timeout={300}
                classNames="slide-top"
                unmountOnExit
            >
                <div ref={contentRef} className={styles.categoryContent}>
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};

export default CategorySection