import { useState } from "react";
import styles from "./styles.module.css";
import petsImg from "../../../assets/icons/pets.svg";
import axios from "axios";
import FormInput from "./formInput";

function FirstOrderForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const { data } = await axios.post(
        "http://localhost:3333/sale/send",
        formData
      );

      setSuccess(true);
      setFormData({ name: "", phone: "", email: "" });
    } catch (error) {
      console.error("Error while submitting:", error);

      if (error.response?.data?.error === "Email already exists") {
        setSubmitError("A user with this email is already registered.");
      } else {
        setSubmitError("Form submission error. Please try again later.");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <form
      id="firstOrderForm"
      onSubmit={handleSubmit}
      className={`${styles.formContainer} wrapper`}
    >
      <h2 style={{ color: "#FFF", textAlign: "center" }}>
        5% off on the first order
      </h2>
      <div className={styles.formDisplay}>
        <div className={styles.imgBox}>
          <img src={petsImg} alt="petsFormImg" />
        </div>
        <div className={styles.inputBox}>
          <FormInput
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormInput
            name="phone"
            type="number"
            placeholder="PhoneNumber"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className={styles.errorContainer}>
            {submitError && <span className={styles.error}>{submitError}</span>}
            {success && (
              <span className={styles.success}>
                Form submitted successfully, the coupon has been sent to your
                email!
              </span>
            )}
          </div>

          <input
            className={styles.btnStyles}
            type="submit"
            value={isSubmitting ? "Sending..." : "Get a discount"}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}

export default FirstOrderForm;
