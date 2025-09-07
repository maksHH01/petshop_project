import React from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const TitlePlusBtn = ({ title, buttonText, buttonLink }) => {
  return (
    <div className={styles.titleBtnContainer}>
      <h2>{title}</h2>
      <div className={styles.buttonStyles}>
        <div className={styles.line} />
        <Button
          component={NavLink}
          to={buttonLink}
          variant="outlined"
          sx={{
            color: "#8B8B8B",
            borderColor: "#DDD",
            fontFamily: "Montserrat",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 500,
            lineHeight: 1.3,
            textTransform: "none",
            borderRadius: "6px",
            marginTop: "9px",
            minWidth: { xs: "100px", sm: "140px" },
            width: { xs: "100%", sm: "auto" },
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: "#0d50ff",
              color: "#fff",
            },
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default TitlePlusBtn;
