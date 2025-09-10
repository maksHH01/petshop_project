import styles from "./styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Counter({ value = 1, onChange }) {
  const decrement = () => {
    if (value > 0) onChange?.(value - 1);
  };

  const increment = () => {
    onChange?.(value + 1);
  };

  return (
    <div className={styles.counter}>
      <button onClick={decrement} className={styles.btn}>
        <RemoveIcon />
      </button>
      <span className={styles.value}>{value}</span>
      <button onClick={increment} className={styles.btn}>
        <AddIcon />
      </button>
    </div>
  );
}

export default Counter;
