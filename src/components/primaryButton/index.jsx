import { Button } from "@mui/material";

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
  if (to) {
    return (
      <Button
        component={NavLink}
        to={to}
        className={className}
        sx={{ ...sx }}
        {...props}
      >
        {children}
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      className={className}
      onClick={handleClick}
      sx={{
        fontFamily: "Montserrat",
        fontWeight: 600,
        textTransform: "none",
        lineHeight: 1.3,
        backgroundColor: "#0D50FF",
        "&:hover": {
          backgroundColor: "#282828",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
