import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./CreateGroup.module.css";
import { CustomGroupAvatar } from "./CustomGroupAvatar/CustomGroupAvatar";
import EditAvatar from "../../assets/icons/edit_avatar_icon.svg";
import { useNavigate } from "react-router-dom";
import { ChooseInterests } from "./ChooseInterests/ChooseInterests";
import { Interests } from "../../types";
import { createGroup, getAllInterests } from "../../API/api-utils";
import { useStore } from "../../store/app-store";


const MAX_DESCRIPTION_LENGTH = 250;

export const CreateGroup: FC = () => {
  const { user, token } = useStore();
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [chars, setChars] = useState<string>("AAA");
  const [color, setColor] = useState<string>("#E17575");
  const [name, setName] = useState<string>('');
  const [availableInterests, setAvailableInterests] = useState<Interests[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Interests[]>([]);
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterestsData = async () => {
      try {
        const responseData = await getAllInterests(token);
        if (responseData) {
          setAvailableInterests(
            responseData.filter(
              (interest: Interests) =>
                !selectedInterests.some(
                  (userInterest) => userInterest.name === interest.name
                )
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchInterestsData();
  }, []);

  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };
  const handleCancelCreateGroup = () => {
    navigate(-1);
  };

  const handleCreateGroup = () => {
    const groupData = {
      chars,
      name,
      color,
      description,
      interests: selectedInterests,
    };
    if (user) createGroup(user.username, token, groupData);
  };

  const addInterest = (interest: { name: string; color: string }) => {
    setAvailableInterests((prev) =>
      prev.filter((item) => item.name !== interest.name)
    );
    setSelectedInterests((prev) => [...prev, interest]);
  };

  const removeInterest = (interest: { name: string; color: string }) => {
    setSelectedInterests((prev) =>
      prev.filter((item) => item.name !== interest.name)
    );
    setAvailableInterests((prev) => [...prev, interest]);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(e.target.value);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <section className={styles.createGroupContainer}>
      <header className={styles.createGroupHeader}>
        <div className={styles.avatarSection}>
          <div
            className={styles.avatarPreview}
            style={{ backgroundColor: `#${color}` }}
          >
            <span className={styles.avatarText}>{chars}</span>
            <button
              onClick={togglePopup}
              className={styles.editAvatarButton}
              aria-label="Изменить аватар"
            >
              <img src={EditAvatar} alt="Изменить аватар" />
            </button>
          </div>
          {isOpenPopup && (
            <CustomGroupAvatar
              setChars={setChars}
              setColor={setColor}
              setIsOpenPopup={togglePopup}
              colorAvatar={color}
              charsAvatar={chars}
            />
          )}
        </div>
        <div className={styles.groupInfo}>
          <label className={styles.label} htmlFor="group-name">
            Название
          </label>
          <input
            id="group-name"
            type="text"
            className={styles.input}
            onChange={handleNameChange}
            placeholder="Введите название группы"
            value={name}
          />

          <label className={styles.label} htmlFor="group-description">
            Описание
          </label>
          <div className={styles.textareaContainer}>
            <textarea
              id="group-description"
              className={styles.textarea}
              placeholder="Введите описание группы"
              value={description}
              onChange={handleDescriptionChange}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              maxLength={MAX_DESCRIPTION_LENGTH}
            />
            <span
              className={styles.charCount}
            >{`${description.length}/${MAX_DESCRIPTION_LENGTH}`}</span>
          </div>
        </div>
      </header>

      <ChooseInterests
        selectedInterests={selectedInterests}
        availableInterests={availableInterests}
        removeInterest={removeInterest}
        addInterest={addInterest}
      />

      <footer className={styles.footer}>
        <button
          onClick={handleCancelCreateGroup}
          className={styles.cancelButton}
        >
          Отменить
        </button>
        <button onClick={handleCreateGroup} className={styles.createButton}>
          Создать группу
        </button>
      </footer>
    </section>
  );
};
