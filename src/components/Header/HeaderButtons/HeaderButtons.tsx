import { FC } from "react";
import styles from "./HeaderButtons.module.css";
import { Link } from "react-router-dom";
import NoticesIcon from "../../../assets/icons/notifications_icon.svg";
import SearchIcon from "../../../assets/icons/search_icon.svg";
import ProfileIcon from "../../../assets/icons/avatar_icon.svg";

interface HeaderButtonsProps {
  isNoticesActive: boolean;
  isSearchActive: boolean;
  onClickNotices: () => void;
  onClickSearch: () => void;
  userLogin: string;
}

export const HeaderButtons: FC<HeaderButtonsProps> = ({
  isNoticesActive,
  isSearchActive,
  onClickNotices,
  onClickSearch,
  userLogin,
}) => {
  return (
    <div className={styles.button__container}>
      <button
        className={`${styles.button} ${isNoticesActive && styles.active}`}
        aria-label="Уведомления"
        onClick={onClickNotices}
      >
        <img
          src={NoticesIcon}
          className={styles.button__item}
          alt="Уведомления"
        />
      </button>
      <button
        className={`${styles.button} ${isSearchActive && styles.active}`}
        aria-label="Поиск"
        onClick={onClickSearch}
      >
        <img src={SearchIcon} className={styles.button__item} alt="Поиск" />
      </button>
      <Link
        to={`/Profile/${userLogin}`}
        className={styles.button}
        aria-label="Профиль"
      >
        <img src={ProfileIcon} className={`${styles.button__item} ${styles.avatar}`} alt="Профиль" />
      </Link>
    </div>
  );
};
