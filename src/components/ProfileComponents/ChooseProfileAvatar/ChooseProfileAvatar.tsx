import { FC, useState } from "react";
import styles from "./ChooseProfileAvatar.module.css";
import ClosePopup from "../../../assets/icons/close_popup.svg";
import { avatars } from "../../../assets/images/avatars/avatars";

interface ChooseProfileAvatarProps {
  userAvatar: keyof typeof avatars;
  setAvatar: (avatar: keyof typeof avatars) => void;
  closePopup: () => void;
}

export const ChooseProfileAvatar: FC<ChooseProfileAvatarProps> = ({
  userAvatar,
  setAvatar,
  closePopup,
}) => {
  const [avatarSelected, setAvatarSelected] = useState<keyof typeof avatars>(userAvatar);

  const handleAvatarSelect = (avatarKey: keyof typeof avatars) => {
    setAvatarSelected(avatarKey);
  };

  const handleSetAvatar = () => {
    setAvatar(avatarSelected);
    closePopup();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.header__title}>Выберите аватар</h2>
          <button onClick={closePopup} className={styles.closeButton}>
            <img src={ClosePopup} alt="Закрыть" />
          </button>
        </div>
        <div className={styles.avatars__container}>
          {Object.entries(avatars).map(([key, avatarSrc]) => (
            <img
              key={key}
              src={avatarSrc}
              alt={key}
              className={`${styles.avatar} ${
                avatarSelected === key ? styles.selected : ""
              }`}
              onClick={() => handleAvatarSelect(key as keyof typeof avatars)}
            />
          ))}
        </div>
        <div className={styles.buttons__container}>
          <button
            disabled={userAvatar === avatarSelected}
            onClick={handleSetAvatar}
            className={`${styles.button} ${styles.setAvatarBtn}`}
          >
            Установить
          </button>
          <button
            onClick={closePopup}
            className={`${styles.button} ${styles.cancelBtn}`}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
