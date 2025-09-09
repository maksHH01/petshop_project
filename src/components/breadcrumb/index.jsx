import { Fragment } from "react";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const buttonSx = {
  color: "#8B8B8B",
  fontSize: "16px",
  fontWeight: 500,
  borderColor: "#DDD",
  textTransform: "none",
  borderRadius: "6px",
  padding: "8px 16px",
  fontFamily: "Montserrat",
  lineHeight: 1.3,
  display: "inline-block",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "left",
  maxWidth: { xs: "100px", sm: "180px", md: "250px" },
  "&:hover": {
    backgroundColor: "#F1F3F4",
    color: "#8B8B8B",
  },
};

const Divider = () => (
  <Box
    sx={{
      height: "1px",
      width: "16px",
      backgroundColor: "#DDD",
      flexShrink: 0,
    }}
  />
);

const CustomBreadcrumbs = ({ items }) => {
  const visibleItems =
    items.length > 5 ? [items[0], { label: "..." }, ...items.slice(-3)] : items;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: { xs: "4px", sm: "8px" },
        mb: { xs: "20px", sm: "40px" },
        mt: { xs: "20px", sm: "40px" },
      }}
    >
      {visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1;
        const buttonProps =
          isLast || !item.path
            ? {
                disabled: true,
                sx: {
                  ...buttonSx,
                  color: "#282828",
                  fontWeight: 500,
                  pointerEvents: "none",
                  "&.Mui-disabled": {
                    borderColor: "#DDD",
                    color: "#000",
                    opacity: 1,
                  },
                },
              }
            : {
                component: NavLink,
                to: item.path,
                sx: buttonSx,
              };

        return (
          <Fragment key={item.path || item.label}>
            <Button variant="outlined" {...buttonProps}>
              {item.label}
            </Button>
            {!isLast && <Divider />}
          </Fragment>
        );
      })}
    </Box>
  );
};

export default CustomBreadcrumbs;
