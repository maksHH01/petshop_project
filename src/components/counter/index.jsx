import { useState } from "react";
import styles from "./styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className={styles.counter}>
      <button onClick={decrement} className={styles.btn}>
        <RemoveIcon />
      </button>
      <span className={styles.value}>{count}</span>
      <button onClick={increment} className={styles.btn}>
        <AddIcon />
      </button>
    </div>
  );
}

export default Counter;
