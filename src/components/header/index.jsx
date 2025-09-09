import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "../header/styles.module.css";
import mainLogo from "../../assets/icons/mainLogo.svg";
import basketLogo from "../../assets/icons/basket.svg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  return (
    <header className={styles.header}>
      <div className={styles.mainLogoContainer}>
        <NavLink to="/">
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

      <div className={styles.burgerMenu} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`${styles.bar} ${menuOpen ? styles.bar1 : ""}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.bar2 : ""}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.bar3 : ""}`}></div>
      </div>

      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.showMenu : ""}`}
      >
        <NavLink
          to="/"
          className={getNavLinkClass}
          onClick={() => setMenuOpen(false)}
        >
          Main Page
        </NavLink>
        <NavLink
          to="/categories"
          className={getNavLinkClass}
          onClick={() => setMenuOpen(false)}
        >
          Categories
        </NavLink>
        <NavLink
          to="/products"
          className={getNavLinkClass}
          onClick={() => setMenuOpen(false)}
        >
          All products
        </NavLink>
        <NavLink
          to="/sales"
          className={getNavLinkClass}
          onClick={() => setMenuOpen(false)}
        >
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
