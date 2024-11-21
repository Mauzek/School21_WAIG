import { FC, useState } from "react";
import styles from "./ProfilePrivacy.module.css";
import imgOK from "../../../assets/icons/checker.svg";
import imgBad from "../../../assets/icons/close_popup.svg";
import { isResponseOk, logoutUser, updateUserSecurity } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";
import { useNavigate } from "react-router-dom";

interface ProfilePrivacyProps {
  username: string;
}

export const ProfilePrivacy: FC<ProfilePrivacyProps> = ({
  username,
}) => {
  const [usernameInput, setUsernameInput] = useState(username);
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, token } = useStore();

  const isFieldValid = (value: string) =>
    value.trim() !== "" && value.trim().length >= 6;

  const getInputStatus = (value: string) => {
    const isValid = isFieldValid(value);
    return isValid ? imgOK : imgBad;
  };

  const getInputClass = (value: string) => {
    const isValid = isFieldValid(value);
    return isValid ? styles.status__green : styles.status__red;
  };

  const handleUndoChanges = () => {
    setNewPassword("");
    setOldPassword("");
    setUsernameInput(username);
  };

  const handleSaveChanges = async () => {
    try {
      if (!user) return;
      const updateData = {
        newUserName: usernameInput,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      const response = await updateUserSecurity(
        user.username,
        token,
        updateData
      );
      if (isResponseOk(response)) {
        handleUndoChanges();
        logoutUser();
        navigate("/auth");
      }
    } catch (error) {
      setError('Похоже что произошла ошибка');
      console.error("Ошибка при обновлении информации о пользователе:", error);
    }
  };

  return (
    <div className={styles.privacy__container}>
      <h2 className={styles.privacy__title}>Изменение конфиденциальности</h2>
      <ul className={styles.privacy__container__list}>
        <li>
          <label htmlFor="usernameInput">Новый логин:</label>
          <input
            id="usernameInput"
            type="text"
            placeholder={username}
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className={getInputClass(usernameInput)}
          />
          <div
            className={`${styles.privacy__input__status} ${getInputClass(
              usernameInput
            )}`}
          >
            <img
              className={styles.imgResult}
              src={getInputStatus(usernameInput)}
              alt="status"
            />
          </div>
        </li>
        <li>
          <label htmlFor="oldPasswordInput">Старый пароль:</label>
          <input
            id="oldPasswordInput"
            placeholder="Подтвердите старый пароль"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={getInputClass(oldPassword)}
            minLength={6}
          />
          <div
            className={`${styles.privacy__input__status} ${getInputClass(
              oldPassword
            )}`}
          >
            <img
              className={styles.imgResult}
              src={getInputStatus(oldPassword)}
              alt="status"
            />
          </div>
        </li>
        <li>
          <label htmlFor="newPasswordInput">Новый пароль:</label>
          <input
            id="newPasswordInput"
            placeholder="Новый пароль от 6ти символов"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={getInputClass(newPassword)}
            minLength={6}
          />
          <div
            className={`${styles.privacy__input__status} ${getInputClass(
              newPassword
            )}`}
          >
            <img
              className={styles.imgResult}
              src={getInputStatus(newPassword)}
              alt="status"
            />
          </div>
        </li>          
      </ul>
      {error.length > 0 && <p className={styles.error}>{error}</p>}
      <ul className={styles.buttons__activity}>
        <li>
          <button
            
            onClick={handleSaveChanges}
            className={styles.buttons__activity__save}
          >
            Сохранить изменения
          </button>
          <button
            onClick={handleUndoChanges}
            className={styles.buttons__activity__cancel}
          >
            Отменить изменения
          </button>
        </li>
      </ul>
    </div>
  );
};
