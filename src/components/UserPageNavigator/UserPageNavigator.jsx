import React, { useState, useEffect } from "react";
import styles from "./UserPageNavigator.module.css";
import { NavLink } from 'react-router-dom';

const UserPageNavigator = () => {
    return (
        <div className={styles.navigatorContainer}>
            <NavLink to="/purchases" className={({ isActive }) => (isActive ? `${styles.dropdownItem} ${styles.active}` : styles.dropdownItem)}>Purchases</NavLink>
            <NavLink to="/wishlist" className={({ isActive }) => (isActive ? `${styles.dropdownItem} ${styles.active}` : styles.dropdownItem)}>Wishlist</NavLink>
            <NavLink to="/personal-info" className={({ isActive }) => (isActive ? `${styles.dropdownItem} ${styles.active}` : styles.dropdownItem)}>Personal Information</NavLink>
        </div>
    )
}

export default UserPageNavigator