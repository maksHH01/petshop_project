import { useState } from "react";
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

  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeFromBasket(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      return "Please fill in all fields";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");
    setSuccess(false);

    const validationError = validate();
    if (validationError) {
      setSubmitError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch("http://localhost:3333/order/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, totalQuantity, totalPrice }),
      });

      setSuccess(true);
      setFormData({ name: "", phone: "", email: "" });
      dispatch(clearBasket());
    } catch (error) {
      console.error("Error while submitting:", error);
      setSubmitError("Form submission error. Please try again later.");
    }

    setIsSubmitting(false);
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

      <div className={styles.itemAndFormContainer}>
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

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.title}>Order details</h3>
          <p className={styles.itemsScore}>{totalQuantity} items</p>
          <div className={styles.sumContainer}>
            <p className={styles.itemsScore}>Total</p>
            <h2>${totalPrice.toFixed(2)}</h2>
          </div>
          <div className={styles.inputs}>
            <input
              className={styles.inputsStyle}
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className={styles.inputsStyle}
              name="phone"
              type="number"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              className={styles.inputsStyle}
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.messageContainer}>
            <span className={styles.error}>{submitError || "\u00A0"}</span>
          </div>

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order"}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}

export default Basket;
