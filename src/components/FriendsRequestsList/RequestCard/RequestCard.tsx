import { FC } from "react";
import { avatars } from "../../../assets/images/avatars/avatars";
import { Link } from "react-router-dom";
import styles from "./RequestCard.module.css";
import { useStore } from "../../../store/app-store";
import { acceptFriendshipReq, declineFriendshipReq } from "../../../API/api-utils";

interface RequestCardProps {
  firstname: string;
  lastname: string;
  username: string;
  description: string;
  avatar: keyof typeof avatars;
  removeFromState: (username: string) => void;
  RelocateReqToFriend: (username: string, firstname: string, lastname: string, profileImageId: string) => void;
}

export const RequestCard: FC<RequestCardProps> = ({
  firstname,
  lastname,
  username,
  description,
  avatar,
  removeFromState,
  RelocateReqToFriend
}) => {
  const { user, token } = useStore();
  const handleAcceptReq = async () => {
    const result = await acceptFriendshipReq(user?.username, username, token);
    RelocateReqToFriend(username, firstname, lastname, avatar);
    removeFromState(username);
  }

  const handleDeclineReq = async () => {
    user && await declineFriendshipReq(user?.username, username, token);
    removeFromState(username);
  }
  return (
    <article className={styles.card}>
      <header>
        <Link
          to={`/Profile/${username}`}
          className={styles.mainInfo__container}
        >
          <figure className={styles.avatar_container}>
            <div className={styles.avatarContainer}>
              <img
                src={avatars[avatar]}
                alt="avatar"
                className={styles.avatar}
              />
            </div>
            <figcaption className={styles.username}>@{username}</figcaption>
          </figure>
          <div className={styles.info_container}>
            <h2 className={styles.name}>{`${firstname} ${lastname}`}</h2>
            <p className={styles.description}>{description}</p>
          </div>
        </Link>
      </header>
      <div className={styles.buttons_container}>
        <button onClick={handleAcceptReq}
          className={`${styles.button} ${styles.acceptBtn}`}
          aria-label={`Принять запрос от ${username}`}
        >
          Принять
        </button>
        <button onClick={handleDeclineReq}
          className={`${styles.button} ${styles.cancelBtn}`}
          aria-label={`Отклонить запрос от ${username}`}
        >
          Отклонить
        </button>
      </div>
    </article>
  );
};
