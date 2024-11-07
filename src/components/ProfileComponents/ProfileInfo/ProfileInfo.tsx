import { FC, useState } from "react";
import styles from "./ProfileInfo.module.css";
import { InterestsList } from "../../InterestsList/InterestsList";
import changeImg from "../../../assets/icons/change_img.svg";
import { Interests, User } from "../../../types";
import { avatars } from "../../../assets/images/avatars/avatars";
import { useStore } from "../../../store/app-store";
import { ChooseProfileAvatar } from "../ChooseProfileAvatar/ChooseProfileAvatar";
import { removeJWT, setUsername } from "../../../API/api-utils";
import { useNavigate } from "react-router-dom";
interface ProfileInfoProps {
  userData: User;
  userInterests: Interests[];
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
  userData,
  userInterests,
}) => {
  const navigate = useNavigate();
  const { user } = useStore();
  const fullName = `${userData.firstname} ${userData.lastname} ${userData.patronymic}`;
  const avatarID = userData.profileImageId as keyof typeof avatars;
  const isFriend = true;
  const formattedBirthday =
    userData.birthday instanceof Date
      ? userData.birthday.toLocaleDateString()
      : userData.birthday;
      const handleExit = () => {
          document.cookie = 'jwt=; Max-Age=-1;'
          document.cookie = 'username=; Max-Age=-1;'
          navigate("/auth")
      };


  return (
    <>
      <div className={styles.info__block}>
        {user&&Avatar(userData.username, avatarID, user)}
        <div className={styles.information}>
          <h2 className={styles.Names}>{fullName}</h2>
          <p className={styles.info__text}>{formattedBirthday} <span className={styles.age}>({userData.age})</span></p>
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
          <legend style={{}} className={styles.profile_description__title}>
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
          {user&&(userData.username === user.username && (
            <button className={styles.exit__button} onClick={handleExit}>Выход</button>
          ))}
          {user&&(userData.username !== user.username && isFriend && (
            <button className={styles.addFriend__button}>
              Добавить в друзья
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

function Avatar(username: string, avatar: keyof typeof avatars, user: User) {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const { setAvatar } = useStore();

  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const handleSetAvatar = (newAvatar: keyof typeof avatars) => {
    setAvatar(newAvatar);
    togglePopup();
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
