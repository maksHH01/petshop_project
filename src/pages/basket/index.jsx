import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  updateQuantity,
  clearBasket,
} from "../../redux/slices/basketSlice";
import PrimaryButton from "../../components/primaryButton";
import styles from "./styles.module.css";
import BasketItem from "./basketItem";
import TitlePlusBtn from "../../components/titlePlusBtn";

function Basket() {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.basket
  );

  const handleRemove = (id) => {
    dispatch(removeFromBasket(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleClear = () => {
    dispatch(clearBasket());
  };

  const products = Object.values(items);

  if (products.length === 0) {
    return (
      <div className={`${styles.container} wrapper`}>
        <TitlePlusBtn
          title={"Shopping cart"}
          buttonText={"Back to the store"}
          buttonLink={"/products"}
        />
        <div className={styles.emptyBasket}>
          <p>Looks like you have no items in your basket currently.</p>
          <PrimaryButton to="/products">Continue Shopping</PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} wrapper`}>
      <TitlePlusBtn
        title={"Shopping cart"}
        buttonText={"Back to the store"}
        buttonLink={"/products"}
      />
      <ul className={styles.list}>
        {products.map((item, index) => (
          <BasketItem
            key={`${item.id}-${index}`}
            item={item}
            onRemove={handleRemove}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </ul>
      <div className={styles.summary}>
        <p>Total items: {totalQuantity}</p>
        <p>Total price: ${totalPrice.toFixed(2)}</p>
      </div>
      <PrimaryButton onClick={handleClear}>Clear Basket</PrimaryButton>
    </div>
  );
}

export default Basket;
