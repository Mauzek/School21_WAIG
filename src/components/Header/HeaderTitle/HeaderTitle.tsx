import { FC } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styles from "./HeaderTitle.module.css";
import BackArrow from "../../../assets/icons/back_arrow.svg";

interface HeaderTitleProps {
  pageTitle: string;
  userLogin?: string;
  groupName?: string;
  hasBackArrow?: boolean;
  navItems?: { label: string; path: string }[];
}

export const HeaderTitle: FC<HeaderTitleProps> = ({
  pageTitle,
  userLogin,
  groupName,
  hasBackArrow,
  navItems,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page__header__text__container}>
      <div className={styles.text__container_main}>
        {hasBackArrow && (
          <img
            src={BackArrow}
            alt="Back"
            className={styles.backArrow}
            onClick={handleBackClick}
          />
        )}
        <h2 className={styles.page__header__title}>{pageTitle}</h2>
        {(userLogin || groupName) && hasBackArrow && (
          <>
            <span className={styles.header__title__span}>|</span>
            <h3 className={styles.page__header__title_profile}>{userLogin ? userLogin : groupName}</h3>
          </>
        )}
      </div>

      {navItems && (
        <nav className={styles.navMenu}>
          <ul className={styles.navMenuList}>
            {navItems.map((item) => (
              <li
                key={item.path}
                className={`${styles.navbar__menu__item} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              >
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
