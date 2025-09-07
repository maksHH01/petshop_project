import styles from "./styles.module.css";
import PrimaryButton from "../../../components/primaryButton/index";
import { NavLink } from "react-router-dom";

function Intro() {
  return (
    <section className={styles.introBlock}>
      <div className={`${styles.content} wrapper`}>
        <h1>Amazing Discounts on Pets Products!</h1>
        <PrimaryButton
          component={NavLink}
          scrollToId="firstOrderForm"
          sx={{
            fontSize: "20px",
            padding: "16px 56px",
            width: "100%",
            maxWidth: "225px",
          }}
        >
          Check out
        </PrimaryButton>
      </div>
    </section>
  );
}

export default Intro;
