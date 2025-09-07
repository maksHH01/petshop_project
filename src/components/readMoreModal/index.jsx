import { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import styles from "./styles.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function ReadMoreModal({ text, maxLength = 200 }) {
  const [open, setOpen] = useState(false);

  if (!text) return null;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const shortText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {shortText}
      </Typography>
      {text.length > maxLength && (
        <Button
          variant="text"
          onClick={handleOpen}
          sx={{
            color: "#282828",
            fontFamily: "Montserrat",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "130%",
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
            textDecorationSkipInk: "none",
            textDecorationThickness: "auto",
            textUnderlineOffset: "auto",
            textUnderlinePosition: "from-font",
            background: "none",
            boxShadow: "none",
            padding: 0,
            textAlign: "start",
            maxWidth: "110px",

            "&:hover": {
              background: "none",
              color: "#0D50FF",
              textDecoration: "underline",
            },
          }}
        >
          Read more
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="read-more-title"
        aria-describedby="read-more-description"
      >
        <Box sx={style}>
          <Typography id="read-more-title" variant="h6" sx={{ mb: 2 }}>
            Full Description
          </Typography>
          <Typography id="read-more-description">{text}</Typography>
          <Button
            onClick={handleClose}
            sx={{ mt: 3, color: "#0d50ff", fontWeight: 600 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
