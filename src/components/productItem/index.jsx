import PrimaryButton from "../primaryButton";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../../redux/slices/basketSlice";

function ProductItem({ id, image, title, price, discont_price }) {
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.basket.items);
  const isInBasket = Object.values(basket).some((item) => item.id === id);

  const handleAddToBasket = () => {
    dispatch(
      addToBasket({
        product: { id, title, price, discont_price, image },
        quantity: 1,
      })
    );
  };

  const discountPercent =
    discont_price && price
      ? Math.round(((price - discont_price) / price) * 100)
      : 0;

  const hasDiscount = discont_price && discont_price < price;

  return (
    <li className={styles.productItem}>
      <div className={styles.imageBlock}>
        <Link to={`/product/${id}`} className={styles.linkOverlay} />
        <img src={`http://localhost:3333${image}`} alt={title} />
        {hasDiscount && (
          <span className={styles.discountBadge}>-{discountPercent}%</span>
        )}
        <PrimaryButton
          onClick={handleAddToBasket}
          disabled={isInBasket}
          className={`${styles.addButton} ${
            isInBasket ? styles.addedButton : ""
          }`}
        >
          {isInBasket ? "Added" : "Add to cart"}
        </PrimaryButton>
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.title}>{title}</p>
        <div className={styles.priceBlock}>
          <p className={styles.price}>
            $ {hasDiscount ? discont_price : price}
          </p>
          {hasDiscount && <p className={styles.oldPrice}>$ {price}</p>}
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
