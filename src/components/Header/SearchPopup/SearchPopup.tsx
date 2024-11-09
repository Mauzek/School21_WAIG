import { FC, useState, useEffect } from "react";
import styles from "./SearchPopup.module.css";
import GroupIcon from "../../../assets/icons/group_icon.png";
import PersonIcon from "../../../assets/icons/person_icon.png";
import InterestIcon from "../../../assets/icons/interest_icon.png";
import { Tooltip } from "antd";
import { Interests } from "../../../types";
import {
  getAllInterests,
  getGroupByPrefixName,
  getGroupsByInterests,
  getUsersByFullName,
  getUsersByInterests,
} from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";
import { avatars } from "../../../assets/images/avatars/avatars";
import { GroupCardGroups } from "../../GroupCardListGroups/GroupCardGroups/GroupCardGroups";
import { Link } from "react-router-dom";

interface SearchPopupProps {
  closePopup: () => void;
  searchRequest: string;
}

export const SearchPopup: FC<SearchPopupProps> = ({
  closePopup,
  searchRequest,
}) => {
  const { token, user } = useStore();
  const [activeButton, setActiveButton] = useState<string>("group");
  const [interestsData, setInterestsData] = useState<Interests[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Interests[]>([]);
  const [groupResults, setGroupResults] = useState<any[]>([]);
  const [userResults, setUserResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchRequest) {
      switch (activeButton) {
        case "group":
          searchGroups();
          break;
        case "person":
          searchUsers();
          break;
        case "interests":
          searchByInterests();
          break;
      }
    }

    const fetchInterests = async () => {
      if (activeButton === "interests" && interestsData.length === 0) {
        const response = await getAllInterests(token);
        setInterestsData(response);
      }
    };
    fetchInterests();
  }, [activeButton, interestsData.length, token, searchRequest]);

  const toggleInterest = (interest: Interests) => {
    setSelectedInterests((prevSelected) => {
      const isSelected = prevSelected.some(
        (item) => item.name === interest.name
      );
      return isSelected
        ? prevSelected.filter((item) => item.name !== interest.name)
        : [...prevSelected, interest];
    });
  };

  useEffect(() => {
    if (activeButton === "interests") {
      searchByInterests();
    }
  }, [selectedInterests, activeButton]);

  const searchGroups = async () => {
    const response = await getGroupByPrefixName(searchRequest, token);
    setGroupResults(response || []);
    setUserResults([]);
  };

  const searchUsers = async () => {
    const [firstname, lastname, patronymic] = searchRequest.split(" ");
    const userFullName = {
      firstName: firstname || "",
      lastName: lastname || "",
      patronymic: patronymic || "",
    };
    const response = await getUsersByFullName(userFullName, token);
    setUserResults(response);
    setGroupResults([]);
  };

  const searchByInterests = async () => {
    const responseGroups = await getGroupsByInterests(selectedInterests, token);
    const responseUsers = await getUsersByInterests(selectedInterests, token);
    setGroupResults(responseGroups || []);
    setUserResults(responseUsers || []);
  };

  const closeToggle = () => {
    closePopup();
    setGroupResults([]);
    setUserResults([]);
  };

  return (
    <div className={styles.overlay} onClick={closeToggle}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.header__title}>Поиск</h2>
          <div className={styles.header__action__container}>
            <Tooltip title="Поиск групп по названию" placement="bottom">
              <button
                onClick={() => setActiveButton("group")}
                className={`${styles.action__btn} ${
                  activeButton === "group" ? styles.button_isActive : ""
                }`}
              >
                <img src={GroupIcon} alt="Group Search" />
              </button>
            </Tooltip>
            <Tooltip title="Поиск друзей по имени" placement="bottom">
              <button
                onClick={() => setActiveButton("person")}
                className={`${styles.action__btn} ${
                  activeButton === "person" ? styles.button_isActive : ""
                }`}
              >
                <img src={PersonIcon} alt="Person Search" />
              </button>
            </Tooltip>
            <Tooltip title="Поиск по интересам" placement="bottom">
              <button
                onClick={() => setActiveButton("interests")}
                className={`${styles.action__btn} ${
                  activeButton === "interests" ? styles.button_isActive : ""
                }`}
              >
                <img
                  className={styles.btn_search_interest}
                  src={InterestIcon}
                  alt="Interest Search"
                />
              </button>
            </Tooltip>
          </div>
          {activeButton === "interests" && (
            <div className={styles.interests__container}>
              <ul className={styles.interests__list}>
                {interestsData?.map((interest) => {
                  const isSelected = selectedInterests.some(
                    (item) => item.name === interest.name
                  );
                  return (
                    <li
                      key={interest.name}
                      className={`${styles.interests__item} ${
                        isSelected ? styles.selected : ""
                      }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      <span
                        className={styles.interests__color}
                        style={{ background: `#${interest.color}` }}
                      />
                      {interest.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.content__container}>
          <div className={styles.results__columns}>
            <div className={styles.groups__column__container} style={activeButton === "person" ? { display: "none" } : {}}>
              {activeButton !== "person" && <h3>Группы</h3>}
              <div className={styles.groups__column}>
                {groupResults.length > 0 ? (
                  groupResults.map((group, index) => (
                    <GroupCardGroups
                      key={index}
                      creator={group.creator}
                      groupID={group.id}
                      name={group.name}
                      chars={group.chars}
                      description={group.description}
                      color={group.color}
                      membersCount={group.subscribers.length + 1}
                      interests={group.interests}
                      isAdded={group.subscribers.some(
                        (subscriber) => subscriber.username === user?.username
                      )}
                    />
                  ))
                ) : activeButton === "interests" ? (
                  <p className={styles.noResults}>Нет групп с такими интересами</p>
                ) : null}
              </div>
            </div>
            <div
              className={styles.users__column__container}
              style={activeButton === "group" ? { display: "none" } : {}}
            >
              {activeButton !== "group" && <h3>Пользователи</h3>}
              <div className={styles.users__column}>
                {userResults.length > 0 ? (
                  userResults.map((user, index) => (
                    <Link to={`/Profile/${user.username}`} key={index}>
                      <article className={styles.member_card__container}>
                        <div className={styles.avatarContainer}>
                          <img
                            src={
                              avatars[
                                user.profileImageId as keyof typeof avatars
                              ]
                            }
                            alt="avatar"
                            className={styles.avatar}
                          />
                        </div>
                        <div className={styles.info}>
                          <h3 className={styles.name}>
                            {`${user.firstname} ${user.lastname}`}
                          </h3>
                          <p className={styles.username}>@{user.username}</p>
                        </div>
                      </article>
                    </Link>
                  ))
                ) : activeButton === "interests" ? (
                  <p className={styles.noResults}>
                    Нет пользователей с такими интересами
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
