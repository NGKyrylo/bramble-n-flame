import React from "react";
import styles from "./Loader.module.css";
// import SmallLogoPart1 from "@/assets/SmallLogoPart1.svg";
// import SmallLogoPart2 from "@/assets/SmallLogoPart2.svg";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <img src='/images/SmallLogoPart1.svg' className={styles.smallLogoPart1}></img>
      <img src='/images/SmallLogoPart2.svg' className={styles.smallLogoPart2}></img>
      {/* <SmallLogoPart1 className={styles.smallLogoPart1}/>
      <SmallLogoPart2 className={styles.smallLogoPart2}/> */}
    </div>
  );
};

export default Loader;