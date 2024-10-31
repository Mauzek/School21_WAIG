// CreateGroup.tsx
import { ChangeEvent, FC, useState } from "react";
import styles from "./CreateGroup.module.css";
import { CustomGroupAvatar } from "./CustomGroupAvatar/CustomGroupAvatar";
import EditAvatar from "../../assets/icons/edit_avatar_icon.svg";
import { useNavigate } from "react-router-dom";
import { ChooseInterests } from "./ChooseInterests/ChooseInterests";

const DataTags = [
  { name: "программирование", color: "#B472EE" },
  { name: "сериалы", color: "#F18100" },
  { name: "музыка", color: "#00C91E" },
  { name: "спорт", color: "#AB2810" },
  { name: "чтение", color: "#0099BB" },
  { name: "общение", color: "#FFFA5A" },
  { name: "гейминг", color: "#DF5B71" },
  { name: "рисование", color: "#9C0B9E" },
  { name: "монтаж", color: "#7CAB3B" },
  { name: "отдых", color: "#161D9B" },
  { name: "математика", color: "#793929" },
  { name: "физика", color: "#217340" },
  { name: "обучение", color: "#BA8D46" },
  { name: "правильноепитание", color: "#EB9A93" },
];

const MAX_DESCRIPTION_LENGTH = 300;

export const CreateGroup: FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [chars, setChars] = useState<string>("AAA");
  const [color, setColor] = useState<string>("#E17575");
  const [availableInterests, setAvailableInterests] = useState(DataTags);
  const [selectedInterests, setSelectedInterests] = useState<
    { name: string; color: string }[]
  >([]);
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const handleCancelCreateGroup = () => {
    navigate(-1);
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

  return (
    <section className={styles.createGroupContainer}>
      <header className={styles.createGroupHeader}>
        <div className={styles.avatarSection}>
          <div
            className={styles.avatarPreview}
            style={{ backgroundColor: color }}
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
            placeholder="Введите название группы"
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
        <button className={styles.createButton}>Создать группу</button>
      </footer>
    </section>
  );
};
