import styles from "./styles.module.css";

function FormInput({ name, type, placeholder, value, onChange }) {
  return (
    <input
      name={name}
      className={styles.inputStyles}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default FormInput;
