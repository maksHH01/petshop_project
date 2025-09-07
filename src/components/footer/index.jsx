import React from "react";
import Box from "@mui/material/Box";
import FooterItem from "../footer/footerComponents/item";
import SocialIcons from "./socialIcons/index";
import FooterMap from "./footerMap/index";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className="wrapper">
      <h2>Contact</h2>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "32px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <FooterItem title="Phone" sx={{ flex: 2, maxWidth: 780 }}>
            <p className={styles.footerContacts}>+49 30 915-88492</p>
          </FooterItem>

          <FooterItem
            title="Socials"
            sx={{ flex: 1, maxWidth: 548, display: "flex" }}
          >
            <SocialIcons />
          </FooterItem>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "32px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <FooterItem title="Address" sx={{ flex: 2, maxWidth: 780 }}>
            <p className={styles.footerContacts}>
              Wallstraẞe 9-13, 10179 Berlin, Deutschland
            </p>
          </FooterItem>

          <FooterItem title="Working Hours" sx={{ flex: 1, maxWidth: 548 }}>
            <p className={styles.footerContacts}>24 hours a day</p>
          </FooterItem>
        </Box>

        <FooterMap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.217020695118!2d13.377704815933933!3d52.51627407981261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851d76e0b3741%3A0x123456789abcdef!2sBrandenburger%20Tor!5e0!3m2!1sen!2sde!4v1693912345678!5m2!1sen!2sde" />
      </Box>
    </footer>
  );
}
