import { FC, useState } from "react";
import styles from "./FriendCard.module.css";
import { RemovePopup } from "../../RemovePopup/RemovePopup";
import { avatars } from "../../../assets/images/avatars/avatars";
import { Link } from "react-router-dom";
import { removeFriendship } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";

interface FriendCardProps {
  name: string;
  username: string;
  avatar: keyof typeof avatars;
  removeFriend: (removeName: string) => void;
}

export const FriendCard: FC<FriendCardProps> = ({ name, username, avatar, removeFriend }) => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const { user, token } = useStore();
  const handleTogglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const FetchRemoveFriend = async () => {
    user && await removeFriendship(username, user.username, token);
    setIsOpenPopup(false);
    removeFriend(username);
  };

  return (
    <article className={styles.card}>
      <Link to={`/Profile/${username}`} className={styles.card__link}>
        <div className={styles.avatarContainer}>
          <img src={avatars[avatar]} alt="avatar" className={styles.avatar} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.username}>@{username}</p>
        </div>
      </Link>
      <button onClick={handleTogglePopup} className={styles.deleteButton}>
        Удалить
      </button>
      {isOpenPopup && (
        <RemovePopup
          type="friend"
          username={username}
          onCancel={handleTogglePopup}
          onConfirm={FetchRemoveFriend}
        />
      )}
    </article>
  );
};
