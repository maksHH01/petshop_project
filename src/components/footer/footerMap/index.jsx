import React from "react";
import styles from "./styles.module.css";

export default function FooterMap() {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.722333932127!2d13.355984176570429!3d52.50226563754254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb0e85329a1%3A0xa141f1e83418ee88!2sIT%20Career%20Hub!5e0!3m2!1sru!2sde!4v1757260859391!5m2!1sru!2sde";
  return (
    <div className={styles.footerMapWrapper}>
      <iframe
        className={styles.footerMap}
        src={mapSrc}
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
