import { FC } from "react";
import { avatars } from "../../../assets/images/avatars/avatars";
import { Link } from "react-router-dom";
import styles from "./RequestCard.module.css";

interface RequestCardProps {
  name: string;
  username: string;
  description: string;
  avatar: keyof typeof avatars;
  cancleRequest: () => void;
  acceptRequest: () => void;
}

export const RequestCard: FC<RequestCardProps> = ({
  name,
  username,
  description,
  avatar,
}) => {

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
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.description}>{description}</p>
          </div>
        </Link>
      </header>
      <div className={styles.buttons_container}>
        <button
          className={`${styles.button} ${styles.acceptBtn}`}
          aria-label={`Принять запрос от ${username}`}
        >
          Принять
        </button>
        <button
          className={`${styles.button} ${styles.cancelBtn}`}
          aria-label={`Отклонить запрос от ${username}`}
        >
          Отклонить
        </button>
      </div>
    </article>
  );
};
