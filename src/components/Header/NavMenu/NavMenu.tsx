import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavMenu.module.css";

interface NavMenuProps {
  menuItems: { label: string; path: string }[];
}

export const NavMenu: FC<NavMenuProps> = ({ menuItems }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);
  return (
    <nav className={styles.navbar__container} >
      <ul className={styles.navbar__menu} >
        <li className={styles.button__nav__close}>
        </li>
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`${styles.navbar__menu__item} ${
              isActive(item.path) ? styles.active : ""
            }`}
          >
            <Link to={item.path} aria-label={item.label} >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};