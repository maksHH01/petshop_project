import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const PrimaryButton = ({
  children,
  sx = {},
  className = "",
  scrollToId,
  to,
  ...props
}) => {
  const handleClick = (e) => {
    if (scrollToId) {
      e.preventDefault();
      const el = document.getElementById(scrollToId);
      if (el) {
        const yOffset = -150;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const buttonStyles = {
    fontFamily: "Montserrat",
    fontWeight: 600,
    padding: "16px 56px",
    textTransform: "none",
    lineHeight: 1.3,
    backgroundColor: "#0D50FF",
    color: "#fff",
    boxShadow: "none",
    borderRadius: 2,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#282828",
      boxShadow: "none",
    },
    "&:active": {
      backgroundColor: "#fff",
      color: "#282828",
      border: "1px solid #282828",
      boxShadow: "none",
      transform: "scale(0.97)",
    },
    "&:focus-visible": {
      outline: "2px solid #0D50FF",
      outlineOffset: 2,
    },
    "&.Mui-disabled": {
      backgroundColor: "#ccc",
      color: "#666",
      boxShadow: "none",
    },
    ...sx,
  };

  if (to) {
    return (
      <Button
        component={NavLink}
        to={to}
        className={className}
        sx={buttonStyles}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      disableElevation
      disableRipple
      variant="contained"
      className={className}
      onClick={handleClick}
      sx={buttonStyles}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
