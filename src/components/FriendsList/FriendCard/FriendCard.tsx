// FriendCard.tsx
import { FC, useState } from "react";
import styles from "./FriendCard.module.css";
import { RemovePopup } from "../../RemovePopup/RemovePopup";
import { avatars } from "../../../assets/images/avatars/avatars";
import { Link } from "react-router-dom";

interface FriendCardProps {
  name: string;
  username: string;
  avatar: keyof typeof avatars;
}

export const FriendCard: FC<FriendCardProps> = ({ name, username, avatar }) => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const handleTogglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const removeFriend = () => {
    setIsOpenPopup(false);
    console.log(`${username} был удален`);
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
          onConfirm={removeFriend}
        />
      )}
    </article>
  );
};
