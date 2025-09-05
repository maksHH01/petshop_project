import React from "react";
import styles from "./styles.module.css";

export default function FooterMap({ src }) {
  return (
    <div className={styles.footerMapWrapper}>
      <iframe
        className={styles.footerMap}
        src={src}
        title="Our Location"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
