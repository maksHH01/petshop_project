import styles from "./styles.module.css";
import closeIcon from "../../../assets/icons/close.svg";
import Counter from "../../../components/counter";

function BasketItem({ item, onRemove, onQuantityChange }) {
  return (
    <li className={styles.item}>
      <div className={styles.imgBox}>
        <img
          src={`http://localhost:3333${item.image}`}
          alt={item.title}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.titleAndCloseContainer}>
          <p className={styles.title}>{item.title}</p>
          <img
            onClick={() => onRemove(item.id)}
            src={closeIcon}
            alt="closeIcon"
          />
        </div>

        <div className={styles.mainItemStyles}>
          <div className={styles.controls}>
            <Counter
              value={item.quantity}
              onChange={(newQuantity) => onQuantityChange(item.id, newQuantity)}
            />
          </div>

          <div className={styles.priceBlock}>
            <p className={styles.price}>
              ${(item.discont_price || item.price) * item.quantity}
            </p>
            {item.discont_price && item.discont_price < item.price && (
              <p className={styles.oldPrice}>${item.price * item.quantity}</p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default BasketItem;
