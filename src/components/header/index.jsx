import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import styles from "../header/styles.module.css";
import mainLogo from "../../assets/icons/mainLogo.svg";
import basketLogo from "../../assets/icons/basket.svg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const burgerRef = useRef();

  const { items } = useSelector((state) => state.basket);

  const [totalQuantity, setTotalQuantity] = useState(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket") || "{}");
    return Object.values(storedBasket).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  });

  const [prevQuantity, setPrevQuantity] = useState(totalQuantity);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const newQuantity = Object.values(items).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    if (newQuantity !== prevQuantity) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
        setPrevQuantity(newQuantity);
      }, 300);
      return () => clearTimeout(timer);
    }
    setTotalQuantity(
      Object.values(items).reduce((sum, item) => sum + item.quantity, 0)
    );
  }, [items, prevQuantity]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
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

      <div
        ref={burgerRef}
        className={styles.burgerMenu}
        onClick={() => setMenuOpen(!menuOpen)}
      >
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
          <Badge
            badgeContent={totalQuantity}
            color="primary"
            overlap="circular"
            showZero
            classes={{
              badge: animate
                ? `${styles.badgeAnimate} ${styles.badgeLeft}`
                : styles.badgeLeft,
            }}
          >
            <img src={basketLogo} alt="basketLogo" />
          </Badge>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
