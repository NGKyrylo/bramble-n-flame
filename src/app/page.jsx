import React, { lazy } from "react";
import styles from "./page.module.css";

const BestSellers = lazy(() => import('./components/BestSellers/BestSellers.jsx'));
const LatestReviews = lazy(() => import('@/components/LatestReviews/LatestReviews.jsx'));
const TheVoice = lazy(() => import('./components/TheVoice/TheVoice.jsx'));

export const metadata = {
  title: "Bramble & Flame",
  description: "Handcrafted soy wax candles inspired by Derbyshire. Vegan-friendly, cruelty-free, and made with love. Discover unique decorative candles for your home.",
  robots: "index, follow",
  alternates: {
    canonical: "https://bramble-n-flame.co.uk",
  },
};

const Home = () => {
  return (
    <main className={styles.main}>

      <picture>
        <source
          srcSet="/images/MainPageImg-2548.webp"
          media="(min-width: 1024px)"
          type="image/webp"
          className={styles.mainPhoto}
          width='100%'
        />
        <img
          src="/images/MainPageImg-1024.webp"  // маленьке для мобільних
          alt="Main"
          className={styles.mainPhoto}
          loading="eager"
          fetchPriority="high"
          width='100%'
        />
      </picture>

      <TheVoice />
      <BestSellers />
      {/* <LatestReviews/> */}
    </main>
  )
}

export default Home;
