import styles from "../header/styles.module.css";
import mainLogo from "../../assets/icons/mainLogo.svg";
import basketLogo from "../../assets/icons/basket.svg";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.mainLogoContainer}>
        <NavLink to="/">
          <img src={mainLogo} alt="mainLogo" />
        </NavLink>
      </div>
      <div className={styles.navLinksContainer}>
        <NavLink to="/">Main Page</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/products">All products</NavLink>
        <NavLink to="/sales">All sales</NavLink>
      </div>
      <div className={styles.basketLogoContainer}>
        <NavLink to="/basket">
          <img src={basketLogo} alt="basketLogo" />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
