import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavMenu } from "./NavMenu/NavMenu";
import { HeaderTitle } from "./HeaderTitle/HeaderTitle";
import { HeaderButtons } from "./HeaderButtons/HeaderButtons";
import styles from "./Header.module.css";
import LogoIcon from "../../assets/icons/logo.svg";
import { User } from "../../store/app-store";
import SearchIcon from "../../assets/icons/search_icon.svg";
import { NoticesPopup } from "../NoticesPopup/NoticesPopup";


interface HeaderProps {
  user: User;
}

export const Header: FC<HeaderProps> = ({ user }) => {
  const [isNoticesBtnActive, setIsNoticesBtnActive] = useState<boolean>(false);
  const [isSearchBtnActive, setIsSearchBtnActive] = useState<boolean>(false);
  const location = useLocation();

  const mainMenuItems = [
    { label: "Главная", path: "/Home" },
    { label: "Группы", path: "/Groups/" },
    { label: "Друзья", path: "/Friends/" },
    ...(user.isAdmin ? [{ label: "Админ", path: "/Admin" }] : []),
  ];

  const getPageTitle = () => {
    if (location.pathname.startsWith("/Home")) return "Интересные группы";
    if (location.pathname.startsWith("/Groups")) return "Группы";
    if (location.pathname.startsWith("/Friends")) return "Друзья";
    if (location.pathname.startsWith("/Profile/")) return "Профиль";
    if (location.pathname.startsWith("/Admin"))
      return "Панель администрирования";
    return "Интересные группы";
  };

  const getNavMenuItems = () => {
    if (location.pathname.startsWith("/Profile/")) {
      return [
        { label: "Профиль", path: `/Profile/${user.login}` },
        { label: "Конфиденциальность", path: `/Profile/${user.login}/Privacy` },
        { label: "Редактирование", path: `/Profile/${user.login}/Edit` },
      ];
    } else if (location.pathname.startsWith("/Groups")) {
      return [
        { label: "Все группы", path: "/Groups/All" },
        { label: "Мои группы", path: "/Groups/My" },
        { label: "Управляемые", path: "/Groups/Managed" },
      ];
    } else if (location.pathname.startsWith("/Friends")) {
      return [
        { label: "Мои друзья", path: "/Friends/All" },
        { label: "Запросы в друзья", path: "/Friends/Requests" },
      ];     
    } else if (location.pathname.startsWith("/Admin")) {
      return [
        { label: "Пользователи", path: "/Admin/Users" },
        { label: "Группы", path: "/Admin/Groups" },
      ];     
    }
    return [];
  };

  const handleClickSearch = () => {
    setIsSearchBtnActive((prev) => !prev);
    if (isNoticesBtnActive) {
      setIsNoticesBtnActive(false);
    }
  };

  const handleClickNotices = () => {
    setIsNoticesBtnActive((prev) => !prev);
    if (isSearchBtnActive) {
      setIsSearchBtnActive(false);
    }
  };

  const pageTitle = getPageTitle();
  const navMenuItems = getNavMenuItems();

  return (
    <header className={styles.page__header}>
      <div className={styles.header__container}>
        <div className={styles.logo__container}>
          <img src={LogoIcon} alt="Логотип" className={styles.logo} />
        </div>

        <div className={styles.navTitleContainer}>
          {!isSearchBtnActive ? (
            <NavMenu menuItems={mainMenuItems} />
          ) : (
            <div className={styles.nav__input__container}>
              <img src={SearchIcon}/>
              <input
                type="text"
                placeholder="Поиск..."
                className={styles.searchInput}
              />
            </div>
          )}

          <HeaderTitle
            pageTitle={pageTitle}
            userLogin={user.login}
            hasBackArrow={location.pathname.startsWith("/Profile/")}
            navItems={navMenuItems}
          />
        </div>

        <HeaderButtons
          isNoticesActive={isNoticesBtnActive}
          isSearchActive={isSearchBtnActive}
          onClickNotices={handleClickNotices}
          onClickSearch={handleClickSearch}
          userLogin={user.login}
        />
      </div>
      {isNoticesBtnActive && <NoticesPopup isNoticesBtnActive={isNoticesBtnActive} onClickNotices={handleClickNotices}/>}
    </header>
  );
};
