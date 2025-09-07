import styles from "./styles.module.css";

function CategoriesItem({ image, title, className, style, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`${styles.item} ${className}`}
      style={style}
    >
      <img src={image} alt={title} />
      <p>{title}</p>
    </li>
  );
}

export default CategoriesItem;
