import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { NavMenu } from "./NavMenu/NavMenu";
import { HeaderTitle } from "./HeaderTitle/HeaderTitle";
import { HeaderButtons } from "./HeaderButtons/HeaderButtons";
import styles from "./Header.module.css";
import LogoIcon from "../../assets/icons/logo.svg";
import { User } from "../../types";
import SearchIcon from "../../assets/icons/search_icon.svg";
import { NoticesPopup } from "../NoticesPopup/NoticesPopup";
import { getUserCreatedGroups } from "../../API/api-utils";
import { useStore } from "../../store/app-store";
import { SearchPopup } from "./SearchPopup/SearchPopup";

interface HeaderProps {
  user: User;
}

export const Header: FC<HeaderProps> = ({ user }) => {
  const { token } = useStore();
  const { username, id } = useParams<{ username: string; id: string }>();
  const [isNoticesBtnActive, setIsNoticesBtnActive] = useState<boolean>(false);
  const [isSearchBtnActive, setIsSearchBtnActive] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();
  const [userGroups, setUserGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const groups = await getUserCreatedGroups(user.username,0,100, token);
        setUserGroups(groups.content);
      } catch (error) {
        console.error("Failed to fetch user groups", error);
      }
    };

    if (user.username && token) {
      fetchUserGroups();
    }
  }, [user.username, token,id]);

  const handleFocus = () => {
    setIsOpenPopup(true);
  };

  const handleBlur = () => {
    setIsOpenPopup(false);
    setInputValue("");
  };

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
    if (location.pathname.startsWith("/Group/")) return "Группа";
    return "Интересные группы";
  };

  const getNavMenuItems = () => {
    if (location.pathname.startsWith("/Profile/")) {
      if (username === user.username) {
        return [
          { label: "Профиль", path: `/Profile/${user.username}` },
          {
            label: "Конфиденциальность",
            path: `/Profile/${user.username}/Privacy`,
          },
          { label: "Редактирование", path: `/Profile/${user.username}/Edit` },
        ];
      } else {
        return [{ label: "Профиль", path: `/Profile/${username}` }];
      }
    } else if (location.pathname.startsWith("/Groups")) {
      return [
        { label: "Все группы", path: "/Groups/All" },
        { label: "Подписки", path: "/Groups/Subscriptions" },
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
        { label: "Интересы", path: "/Admin/Interests" },
        { label: "Статистика", path: "/Admin/Statistic" },
      ];
    }
    if (location.pathname.startsWith("/Group/")) {
      if (userGroups.some((group) => group.id === Number(id))) {
        return [
          { label: "Главная", path: `/Group/${id}/Main` },
          { label: "Участники", path: `/Group/${id}/Members` },
          { label: "Редактирование", path: `/Group/${id}/Edit` },
        ];
      } else {
        return [
          { label: "Главная", path: `/Group/${id}/Main` },
          { label: "Участники", path: `/Group/${id}/Members` },
        ];
      }
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

  const handleSearch = () => {
    setSearchQuery(inputValue);
    setIsSearchBtnActive(true);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
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
              <img src={SearchIcon} className={styles.searchInput__icon} alt="Поиск" onClick={handleSearch} />
            <input
              type="search"
              placeholder="Поиск..."
              value={inputValue}
              onFocus={handleFocus}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className={styles.searchInput}
            />
            </div>
          )}

          {isOpenPopup &&  <SearchPopup
            closePopup={handleBlur}
            searchRequest={searchQuery} 
          />}

          <HeaderTitle
            pageTitle={pageTitle}
            userLogin={username}
            groupName={id}
            hasBackArrow={
              location.pathname.startsWith("/Profile/") ||
              location.pathname.startsWith("/Group/")
            }
            navItems={navMenuItems}
          />
        </div>

        <HeaderButtons
          isNoticesActive={isNoticesBtnActive}
          isSearchActive={isSearchBtnActive}
          onClickNotices={handleClickNotices}
          onClickSearch={handleClickSearch}
          userLogin={user.username}
          userAvatar={user.profileImageId}
        />
      </div>
      {isNoticesBtnActive && (
        <NoticesPopup
          isNoticesBtnActive={isNoticesBtnActive}
          onClickNotices={handleClickNotices}
        />
      )}
    </header>
  );
};
