import { FC } from "react";
import styles from "./RemovePopup.module.css";
import ClosePopup from "../../assets/icons/close_popup.svg";

interface RemovePopupProps {
  type: "friend" | "group" | "group remove";
  username?: string;
  groupName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const RemovePopup: FC<RemovePopupProps> = ({
  type,
  username,
  groupName,
  onConfirm,
  onCancel,
}) => {
  const isFriend = type === "friend";
  const title = isFriend ? "удалить этого друга" : type === "group remove" ? "удалить эту группу": "покинуть эту группу";
  const confirmText = isFriend ? "Да, удалить" : type === "group remove" ? "Да, удалить": "Да, покинуть";

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.header__title}>Вы точно хотите {title}?</h2>
          <button onClick={onCancel} className={styles.closeButton}>
            <img src={ClosePopup} alt="Закрыть" />
          </button>
        </div>
        <div className={styles.info__container}>
          {isFriend && username && (
            <p className={styles.info}>
              Вы удаляете пользователя&nbsp;
              <span className={`${styles.span} ${styles.username}`}>
                {username}
              </span>
              из вашего списка друзей.
            </p>
          )}
          {!isFriend && groupName && type === "group" && (
            <p className={styles.info}>
              Вы покидаете сообщество&nbsp;
              <span className={`${styles.span} ${styles.groupName}`}>
                {groupName}
              </span>
              .
            </p>
          )}
           {!isFriend && groupName && type === "group remove" && (
            <p className={styles.info}>
              Вы удаляете сообщество&nbsp;
              <span className={`${styles.span} ${styles.groupName}`}>
                {groupName}
              </span>
              .
            </p>
          )}
        </div>
        <div className={styles.buttons_container}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmText}
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
