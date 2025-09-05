import introImg from "../../../assets/images/mainPetsImage.png";
import styles from "./styles.module.css";

function Intro() {
  return (
    <section className={styles.introBlock}>
      <div className={styles.content}>
        <h1>Welcome to PetShop</h1>
        <p>Find your perfect companion today</p>
      </div>
    </section>
  );
}

export default Intro;
