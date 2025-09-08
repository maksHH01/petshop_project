import { Padding } from "@mui/icons-material";
import Counter from "../../../components/counter";
import PrimaryButton from "../../../components/primaryButton";
import styles from "./styles.module.css";
import ReadMoreModal from "../../../components/readMoreModal";
import CustomBreadcrumbs from "../../../components/breadcrumb";

function ProductInfo({ title, image, price, discont_price, description }) {
  const hasDiscount = discont_price && discont_price < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discont_price) / price) * 100)
    : 0;

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
              <p className={styles.oldPrice}>$ {price}</p>
              <span className={styles.discountBadge}>-{discountPercent}%</span>
            </>
          ) : (
            <p className={styles.newPrice}>$ {price}</p>
          )}
        </div>

        <div className={styles.cartAddingContainer}>
          <Counter />
          <PrimaryButton
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
