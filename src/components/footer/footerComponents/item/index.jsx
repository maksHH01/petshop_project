import Paper from "@mui/material/Paper";
import styles from "./styles.module.css";

export default function FooterItem({ title, children, sx }) {
  return (
    <Paper
      sx={{
        padding: 4,
        backgroundColor: "#f1f3f4",
        boxShadow: "none",
        borderRadius: "12px",
        ...sx,
      }}
    >
      <div className={styles.itemContainer}>
        <p className={styles.labelFooter}>{title}</p>
        {children}
      </div>
    </Paper>
  );
}
