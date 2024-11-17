import { FC, useState } from "react";
import styles from "./ProfilePrivacy.module.css";
import imgOK from "../../../assets/icons/checker.svg";
import imgBad from "../../../assets/icons/close_popup.svg";
import { logoutUser, updateUserSecurity } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";
import { useNavigate } from "react-router-dom";

interface ProfilePrivacyProps {
  email: string;
  username: string;
}

export const ProfilePrivacy: FC<ProfilePrivacyProps> = ({
  email,
  username,
}) => {
  const [usernameInput, setUsernameInput] = useState(username);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { user, token } = useStore();

  const isFieldValid = (value: string) =>
    value.trim() !== "" && value.trim().length >= 4;

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
      if(!user) return;
      const updateData = {
        newEmail: email,
        newUsername: usernameInput,
        newPassword: newPassword,
      };

      const response = await updateUserSecurity(user.username, token, updateData);

      if (response) {
        handleUndoChanges(); 
        logoutUser();
        navigate("/auth");
      }
    } catch (error) {
      console.error("Ошибка при обновлении информации о пользователе:", error);
    }
  };

  return (
    <>
      <h2 className={styles.privacy__title}>Изменение конфиденциальности</h2>
      <ul className={styles.privacy__container}>
        <li>
          <label htmlFor="usernameInput">Изменить ник/логин:</label>
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
          <h3>Изменение пароля</h3>
        </li>
        <li>
          <label htmlFor="oldPasswordInput">Старый пароль:</label>
          <input
            id="oldPasswordInput"
            placeholder="Старый пароль от 4х символов"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={getInputClass(oldPassword)}
            minLength={4}
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
            placeholder="Новый пароль от 4х символов"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={getInputClass(newPassword)}
            minLength={4}
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
        <li>
          <button className={styles.buttons__activity__exit}>Выход</button>
        </li>
      </ul>
    </>
  );
};
