import styles from "./styles.module.css";

function BasketItem({ item, onRemove, onQuantityChange }) {
  return (
    <li className={styles.item}>
      <img
        src={`http://localhost:3333${item.image}`}
        alt={item.title}
        className={styles.image}
      />
      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>

        <div className={styles.priceBlock}>
          <p className={styles.price}>
            ${(item.discont_price || item.price) * item.quantity}
          </p>
          {item.discont_price && item.discont_price < item.price && (
            <p className={styles.oldPrice}>${item.price * item.quantity}</p>
          )}
        </div>

        <div className={styles.controls}>
          <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
            +
          </button>
        </div>

        <button className={styles.remove} onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </li>
  );
}

export default BasketItem;
