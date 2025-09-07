import styles from "../header/styles.module.css";
import mainLogo from "../../assets/icons/mainLogo.svg";
import basketLogo from "../../assets/icons/basket.svg";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.mainLogoContainer}>
        <NavLink to="/" onClick={handleLogoClick}>
          <img src={mainLogo} alt="mainLogo" />
        </NavLink>
      </div>

      <div className={styles.navLinksContainer}>
        <NavLink to="/" className={getNavLinkClass}>
          Main Page
        </NavLink>
        <NavLink to="/categories" className={getNavLinkClass}>
          Categories
        </NavLink>
        <NavLink to="/products" className={getNavLinkClass}>
          All products
        </NavLink>
        <NavLink to="/sales" className={getNavLinkClass}>
          All sales
        </NavLink>
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
