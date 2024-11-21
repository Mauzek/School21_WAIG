import { FC, useEffect, useState } from "react";
import styles from "./ProfileInfo.module.css";
import { InterestsList } from "../../InterestsList/InterestsList";
import changeImg from "../../../assets/icons/change_img.svg";
import { Interests, User } from "../../../types";
import { avatars } from "../../../assets/images/avatars/avatars";
import { useStore } from "../../../store/app-store";
import { ChooseProfileAvatar } from "../ChooseProfileAvatar/ChooseProfileAvatar";
import { acceptFriendshipReq, declineFriendshipReq, getFriendship, getFriendshipReq, removeFriendship, sendFriendshipRequest } from "../../../API/api-utils";
import { logoutUser, setUserProfileImage } from "../../../API/api-utils";
import { useNavigate } from "react-router-dom";
interface ProfileInfoProps {
  userData: User;
  userInterests: Interests[];
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
  userData,
  userInterests,
}) => {
  const { user, token } = useStore();
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isInvited, setIsInvited] = useState<boolean>(false);
  const [isInviter, setIsInviter] = useState<boolean>(false);
  const fullName = `${userData.firstname} ${userData.lastname} ${userData.patronymic}`;
  const avatarID = userData.profileImageId as keyof typeof avatars;
  const formattedBirthday =
    userData.birthday instanceof Date
      ? userData.birthday.toLocaleDateString()
      : userData.birthday;
  const navigate = useNavigate();
  const handleLogoutUser = () => {
    logoutUser();
    navigate("/auth");
  }


  useEffect(() => {
    const fetchFriendShips = async () => {
      if (user) {
        const result = await getFriendship(user.username, token);
        const friendResult = result.content.some(user => user.username === userData.username);
        const friendsReq = await getFriendshipReq(userData.username, token);
        setIsInvited(friendsReq.some(item => item.friend.username === userData.username && item.user.username === user.username));

        const friendsReq2 = await getFriendshipReq(user.username, token);
        setIsInviter(friendsReq2.some(item => item.friend.username === user.username && item.user.username === userData.username));
        setIsFriend(friendResult);
      }
    };
    fetchFriendShips();
  }, [userData])

  const handleAddFriend = async () => {
    const result =
      user && await sendFriendshipRequest(user.username, userData.username, token);
    if (result.status === "PENDING")
      setIsInvited(true);
  };

  const handleRemoveFriendship = async () => {
    const result = user && await removeFriendship(user.username, userData.username, token);
    setIsFriend(false);
    setIsInvited(false);
    setIsInviter(false);
  };

  const handleDeclineRequest = async () => {
    const result = user && isInviter ? await declineFriendshipReq(user.username, userData.username, token) : await declineFriendshipReq(userData.username, user.username, token);
    if (result.status === "DECLINED") {
      setIsInvited(false);
      setIsInviter(false);
      setIsFriend(false);
    }
  };

  const handleAcceptRequest = async () => {
    const result = user && await acceptFriendshipReq(user.username, userData.username, token);

    if (result.status === "ACCEPTED") {
      setIsFriend(true);
      setIsInvited(false);
      setIsInviter(false);
    }
  };
  return (
    <>
      <div className={styles.info__block}>
        {user && Avatar(userData.username, avatarID, user)}
        <div className={styles.information}>
          <h2 className={styles.Names}>{fullName}</h2>
          <p className={styles.info__text}>
            {formattedBirthday}{" "}
            <span className={styles.age}>({userData.age})</span>
          </p>
          <a
            className={`${styles.info__link} ${styles.info__text}`}
            href={`https://t.me/${userData.tgName}`}
            target="_blank"
          >
            @{userData.tgName}
          </a>
          <p className={styles.info__text}>{userData.email}</p>
          <p
            style={
              userData.gender === "Female"
                ? { color: "#FF547F" }
                : { color: "#008BFF" }
            }
          >
            {userData.gender === "Female" ? "жен" : "муж"}.
          </p>
        </div>
        <fieldset className={styles.profile__description}>
          <legend className={styles.profile_description__title}>
            О Себе
          </legend>
          <p
            style={{ wordBreak: "break-all", fontSize: "12px" }}
            className={styles.profile_description__text}
          >
            {userData.description}
          </p>
        </fieldset>
      </div>
      <div className={styles.interests__description}>
        <InterestsList interests={userInterests} />
        <div className={styles.buttons__container}>
          {userData.username === user?.username && (
            <button onClick={handleLogoutUser} className={styles.exit__button}>
              Выход
            </button>
          )}
          {userData.username !== user?.username && (isFriend ? (
            <button onClick={handleRemoveFriendship} className={styles.exit__button}>
              Удалить из друзей
            </button>) : (isInvited ? (<><button className={styles.invited__button} >
              Отправлено
            </button>
              <button className={styles.exit__button} onClick={handleDeclineRequest}>
                Отклонить
              </button>
            </>) : (isInviter ?
              (<><button className={styles.addFriend__button} onClick={handleAcceptRequest}>
                Принять
              </button><button className={styles.exit__button} onClick={handleDeclineRequest}>
                  Отклонить
                </button></>)
              : (<button onClick={handleAddFriend} className={styles.addFriend__button} >
                Добавить в друзья
              </button>))
          )
          )}
        </div>
      </div>
    </>
  );
};

function Avatar(username: string, avatar: keyof typeof avatars, user: User) {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const { setAvatar, token } = useStore();

  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const handleSetAvatar = (newAvatar: keyof typeof avatars) => {
    togglePopup();
    if (token) setUserProfileImage(username, token, newAvatar);
    setAvatar(newAvatar);
  };
  return (
    <div>
      <div className={styles.avatar__container}>
        {user.username === username && (
          <button className={styles.avatar__change} onClick={togglePopup}>
            <img src={changeImg} className={styles.avatar__change__img} />
          </button>
        )}
        {isOpenPopup && (
          <ChooseProfileAvatar
            userAvatar={avatar}
            setAvatar={handleSetAvatar}
            closePopup={togglePopup}
          />
        )}
        <img src={avatars[avatar]} className={styles.avatar} />
      </div>
      <p className={styles.avatar__description}>{username}</p>
    </div>
  );
}
