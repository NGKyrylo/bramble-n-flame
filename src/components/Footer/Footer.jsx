import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import Link from "next/link"
// import { ReactComponent as MiniLogo } from "../../assets/MiniLogo.svg";
// import { ReactComponent as InstagramIcon } from "../../assets/InstagramIcon.svg";
// import { ReactComponent as FacebookIcon } from "../../assets/FacebookIcon.svg";
import MiniLogo from "/src/assets/MiniLogo.svg?react";
import InstagramIcon from "/src/assets/InstagramIcon.svg";
import FacebookIcon from "/src/assets/FacebookIcon.svg";
import useWindowWidth from "@/hooks/useWindowWidth";

const Footer = () => {
  const windowWidth = useWindowWidth();
  const [footerData, setFooterData] = useState(null);

  const instagramLink = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const facebookLink = process.env.NEXT_PUBLIC_FACEBUK_URL;

  useEffect(() => {
    fetch("/footer.json")
      .then((res) => res.json())
      .then((data) => setFooterData(data))
      .catch((err) => console.error("Error loading footer data:", err));
  }, []);

  const handleRedirect = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const isMobile = windowWidth <= 768;

  if (!footerData) return null;

  const isExternal = (url) => /^https?:\/\//.test(url);

  const SmartLink = ({ url, children }) => {
    if (isExternal(url)) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", cursor: "pointer" }}
        >
          {children}
        </a>
      );
    } else {
      return (
        <Link
          href={url}
          style={{ display: "block", cursor: "pointer" }}
        >
          {children}
        </Link>
      );
    }
  };

  return (
    <footer className={styles.footer}>
      {!isMobile &&
        <Link className={styles.miniLogo} href="/">
          <MiniLogo height={32} viewBox='0 0 24 36' />
        </Link>
      }
      <div className={styles.linksContainer}>
        <div>
          {footerData.firstColumn.map(([name, link], index) => (
            <SmartLink key={index} url={link}>{name}</SmartLink>
          ))}
        </div>
        <div>
          {footerData.secondColumn.map(([name, link], index) => (
            <SmartLink key={index} url={link}>{name}</SmartLink>
          ))}
        </div>
        <div>
          {footerData.thirdColumn.map(([name, link], index) => (
            <SmartLink key={index} url={link}>{name}</SmartLink>
          ))}
        </div>
        <div>
          {footerData.fourthColumn.map(([name, link], index) => (
            <SmartLink key={index} url={link}>{name}</SmartLink>
          ))}
        </div>
      </div>
      <div className={styles.mediaLinks}>
        {/* <img
          src={FacebookIcon}
          alt="Facebook Icon"
          height={24}
          onClick={() => handleRedirect(footerData.facebookLink)}
          style={{ cursor: 'pointer' }}
        />
        <img
          src={InstagramIcon}
          alt="Instagram Icon"
          height={24}
          onClick={() => handleRedirect(footerData.instagramLink)}
          style={{ cursor: 'pointer' }}
        /> */}
        {!isMobile && <FacebookIcon
          height={24}
          onClick={() => handleRedirect(facebookLink)}
          style={{ cursor: 'pointer' }}
        />}
        {!isMobile && <InstagramIcon
          height={24}
          onClick={() => handleRedirect(instagramLink)}
          style={{ cursor: 'pointer' }}
        />}
      </div>
    </footer>
  );
};

export default Footer;
