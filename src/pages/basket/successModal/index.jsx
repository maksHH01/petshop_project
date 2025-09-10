import React from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import closeIcon from "../../../assets/icons/close.svg";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "548px",
  bgcolor: "#0D50FF",
  border: "none",
  boxShadow: 5,
  p: 4,
  borderRadius: "12px",
  textAlign: "start",
  display: "flex",
  gap: "16px",
};

export default function SuccessModal({ open, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <Modal
      open={open}
      onClose={onClose}
      disableEnforceFocus
      disableAutoFocus
      closeAfterTransition
    >
      <Box sx={style}>
        <Box>
          <Typography variant="h6" sx={{ color: "#FFF", fontSize: "40px" }}>
            Congratulations!
          </Typography>
          <Typography sx={{ mt: 2, color: "#FFF", fontSize: "20px" }}>
            Your order has been successfully placed on the website.
          </Typography>
          <Typography sx={{ mt: 2, color: "#FFF" }}>
            A manager will contact you shortly to confirm your order.
          </Typography>
        </Box>
        <Box
          component="img"
          src={closeIcon}
          alt="Close"
          onClick={onClose}
          sx={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            filter: "invert(1)",
            p: 0,
            m: 0,
          }}
        />
      </Box>
    </Modal>,
    document.body
  );
}
