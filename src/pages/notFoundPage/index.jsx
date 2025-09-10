import styles from "./styles.module.css";
import fourNumber from "../../assets/icons/error4.svg";
import errorPetsImg from "../../assets/images/errorPets.png";
import PrimaryButton from "../../components/primaryButton";

function NotFoundPage() {
  return (
    <div className={`${styles.container} wrapper`}>
      <div className={styles.imagesContainer}>
        <img src={fourNumber} alt="error 4 number" />
        <img src={errorPetsImg} alt="error pets img" />
        <img src={fourNumber} alt="error 4 number" />
      </div>
      <div className={styles.infoContainer}>
        <h2>Page Not Found</h2>
        <p className={styles.textStyles}>
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
        <PrimaryButton
          to="/"
          sx={{
            padding: "16px 56px",
          }}
        >
          Go Home
        </PrimaryButton>
      </div>
    </div>
  );
}

export default NotFoundPage;
