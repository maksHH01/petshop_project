import { useState } from "react";
import { useDispatch } from "react-redux";
import Counter from "../../../components/counter";
import PrimaryButton from "../../../components/primaryButton";
import styles from "./styles.module.css";
import ReadMoreModal from "../../../components/readMoreModal";
import { addToBasket } from "../../../redux/slices/basketSlice";

function ProductInfo({ id, title, image, price, discont_price, description }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = discont_price && discont_price < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discont_price) / price) * 100)
    : 0;

  const handleAddToBasket = () => {
    dispatch(
      addToBasket({
        product: { id, title, image, price, discont_price },
        quantity,
      })
    );
  };

  return (
    <div className={styles.productInfo}>
      <div className={styles.imgContainer}>
        <img src={`http://localhost:3333${image}`} alt={title} />
      </div>
      <div className={styles.productInfoBox}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.prices}>
          {hasDiscount ? (
            <>
              <p className={styles.newPrice}>$ {discont_price}</p>
              <div className={styles.oldPriceContainer}>
                <p className={styles.oldPrice}>$ {price}</p>
                <span className={styles.discountBadge}>
                  -{discountPercent}%
                </span>
              </div>
            </>
          ) : (
            <p className={styles.newPrice}>$ {price}</p>
          )}
        </div>

        <div className={styles.cartAddingContainer}>
          <Counter value={quantity} setValue={setQuantity} />{" "}
          <PrimaryButton
            onClick={handleAddToBasket}
            sx={{
              width: "100%",
              maxWidth: "316px",
              padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              borderRadius: "8px",
            }}
          >
            Add to cart
          </PrimaryButton>
        </div>

        <div className={styles.descriptionBlock}>
          <h3 className={styles.titleDescription}>Description</h3>
          <ReadMoreModal
            className={styles.paragraph}
            text={description}
            maxLength={450}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
