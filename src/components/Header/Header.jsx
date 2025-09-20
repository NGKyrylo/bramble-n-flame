import React, { useEffect, useState, useRef } from 'react';
// import { Link } from "react-router-dom";
// import { NavLink } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import Link from "next/link"
import { useRouter } from "next/navigation";
import styles from "./header.module.css";
import MiniLogo from "/src/assets/MiniLogo.svg";
import BasketIcon from "/src/assets/BasketIcon.svg";
import Button from "../Button/Button.jsx";
import Avatar from '../Avatar/Avatar.jsx';
import BasketDropdown from '../BasketDropdown/BasketDropdown.jsx';
import BurgerMenuIcon from "/src/assets/BurgerMenuIcon.svg";
import XIcon from "/src/assets/XIcon.svg";
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useCart } from '../../contexts/CartContext.jsx';

import Moon from '/src/assets/Moon.svg';
import Sun from '/src/assets/Sun.svg';
import InstagramIcon from "/src/assets/InstagramIcon.svg";
import FacebookIcon from "/src/assets/FacebookIcon.svg";

import { CSSTransition } from 'react-transition-group';
import { useTheme } from '../../contexts/ThemeContext.jsx';

import { usePathname } from 'next/navigation';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useLoader } from '@/contexts/LoaderContext';

// const Header = ({isLoggedIn, setIsLoggedIn}) => {
const Header = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const windowWidth = useWindowWidth();
  const { isAuth, avatarSrc, logout } = useAuth();
  const { clearCart } = useCart();
  const router = useRouter();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBasket, setShowBasket] = useState(false);

  // const [localAvatarSrc, setLocalAvatarSrc] = useState(avatasSrc);

  // useEffect(() => {
  //   setLocalAvatarSrc(avatasSrc)
  // })

  const [basketItems, setBasketItems] = useState([
    // {id: 1, name: 'Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text', image: null, price: 0.00, qty: 1},
    // {id: 1, name: 'Text', image: null, price: 0.00, qty: 1},
  ]);

  const handleLogin = () => {
    router.push("/sign-in");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false)
  };

  // const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  // );

  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  // const handeChangeTheme = () => {
  //   if (theme == 'light') {
  //     setTheme('dark');
  //   } else {
  //     setTheme('light');
  //   }
  // }

  // const handleResize = () => {
  //   setWindowWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  const isMobile = windowWidth <= 768;

  const burgerRef = useRef(null);

  const MobileHeader = () => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    const handleOpenBurger = () => {
      setIsBurgerOpen(!isBurgerOpen);
    }

    const instagramLink = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
    const facebookLink = process.env.NEXT_PUBLIC_FACEBUK_URL;

    const handleRedirect = (link) => {
      window.open(link, "_blank", "noopener,noreferrer");
    };

    return (
      <header className={styles.headerMobile}>
        <Link className={styles.miniLogo} href="/"><MiniLogo height={32} viewBox='0 0 24 36' /></Link>
        <div className={styles.mobileHeaderIcons}>
          <Link className={styles.basketIcon} href="/basket"><BasketIcon height={32} /></Link>
          {theme == 'dark'
            ? <Moon height={32} onClick={toggleTheme} />
            : <Sun height={32} onClick={toggleTheme} />
          }
          {isBurgerOpen
            ? <XIcon height={32} onClick={handleOpenBurger} className={styles.burgerIcon} />
            : <BurgerMenuIcon height={32} onClick={handleOpenBurger} className={styles.burgerIcon} />
          }
          {/* {isBurgerOpen && ( */}
          <CSSTransition
            nodeRef={burgerRef}
            in={isBurgerOpen}
            timeout={300}
            classNames="slide-top"
            unmountOnExit
          >
            <div className={styles.burgerMenuContainer} ref={burgerRef}>
              <nav className={styles.mobileNav}>
                <ul>
                  <li><Link href="/products" className={pathname === '/products' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Products</Link></li>
                  <li><Link href="/contact" className={pathname === '/contact' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Contact</Link></li>
                  {isAuth && <li><Link href="/purchases" className={pathname === '/purchases' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Purchases</Link></li>}
                  {isAuth && <li><Link href="/wishlist" className={pathname === '/wishlist' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Wishlist</Link></li>}
                  {isAuth && <li><Link href="/personal-info" className={pathname === '/personal-info' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Personal info</Link></li>}
                  {isAuth && <li><Link onClick={() => {
                    clearCart();
                    logout();
                  }} className={styles.navLink}>Log out</Link></li>}
                  {!isAuth && <Button variant="neutral" size="small" fullWidth onClick={handleLogin} className={styles.burgerMenuBtn}>Sign in</Button>}
                  {!isAuth && <Button variant="primary" size="small" fullWidth onClick={handleRegister} className={styles.burgerMenuBtn}>Register</Button>}
                </ul>
              </nav>
              <div className={styles.mediaLinks}>
                <FacebookIcon
                  height={32}
                  onClick={() => handleRedirect(facebookLink)}
                  style={{ cursor: 'pointer' }}
                />
                <InstagramIcon
                  height={32}
                  onClick={() => handleRedirect(instagramLink)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </CSSTransition>
          {/* )} */}
        </div>
      </header>
    )
  }

  const dropdownRef = useRef(null);
  const basketRef = useRef(null);

  const DesktopHeader = () => {
    return (
      <header className={styles.header}>
        <Link className={styles.miniLogo} href="/"><MiniLogo height={32} viewBox='0 0 24 35' /></Link>
        <nav className={styles.headerNav}>
          <ul>
            <li><Link href="/products" className={pathname === '/products' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Products</Link></li>
            <li><Link href="/contact" className={pathname === '/contact' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Contact</Link></li>
          </ul>
        </nav>
        {!isAuth ? (
          <div className={styles.accountBtns}>
            <Button variant="neutral" size="small" fullWidth onClick={handleLogin}>Sign in</Button>
            <Button variant="primary" size="small" fullWidth onClick={handleRegister}>Register</Button>
          </div>
        ) : (
          <div className={styles.avatarContainer} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <Link className={styles.avatarIcon} href="/purchases"><Avatar size="small" src={avatarSrc} /></Link>
            {showDropdown && (
              <div className={styles.dropdownMenu} ref={dropdownRef}>
                <Link href="/purchases" className={styles.dropdownItem}>Purchases</Link>
                <Link href="/wishlist" className={styles.dropdownItem}>Wishlist</Link>
                <Link href="/personal-info" className={styles.dropdownItem}>Personal info</Link>
                <Link className={styles.dropdownItem} onClick={() => {
                  clearCart();
                  logout();
                }}>Log out</Link>
              </div>
            )}
          </div>
        )}
        {/* <BasketIcon height={32} /> */}

        <div className={styles.rightBtnContainer}>
          <div className={styles.basketContainer} onMouseEnter={() => setShowBasket(true)} onMouseLeave={() => setShowBasket(false)}>
            <Link className={styles.basketIcon} href="/basket"><BasketIcon height={32} /></Link>
            {showBasket && (
              <div className={styles.basketDropdown} ref={basketRef}>
                <BasketDropdown hideDropdownFunction={() => setShowBasket(false)} />
              </div>
            )}
          </div>
          <div
            className={styles.changeThemeBtn}
            onClick={toggleTheme}
          >
            {theme == 'dark'
              ? <Moon className={styles.changeThemeBtnIco} viewBox='0 0 32 32' />
              : <Sun className={styles.changeThemeBtnIco} viewBox='0 0 32 32' />
            }
          </div>
        </div>
      </header>
    )
  }

  if (windowWidth === 0) return null;
  
  return (
    isMobile ? (
      <MobileHeader />
    ) : (
      <DesktopHeader />
    )
  );
};

export default Header;

// onMouseEnter={() => setShowBasket(true)} onMouseLeave={() => setShowBasket(false)}