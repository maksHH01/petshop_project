import React from "react";
import insta from "../../../assets/icons/instagram.svg";
import whatsapp from "../../../assets/icons/whatsapp.svg";
import styles from "./styles.module.css";

export default function SocialIcons() {
  return (
    <div className={styles.socialIcons}>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={insta} alt="InstaLogo" />
      </a>
      <a
        href="https://www.whatsapp.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={whatsapp} alt="WhatsappLogo" />
      </a>
    </div>
  );
}
