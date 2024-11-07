import { FC, useState } from "react";
import styles from "./ProfileEdit.module.css";
import { useStore } from "../../../store/app-store";
import { ChooseInterests } from "../../CreateGroup/ChooseInterests/ChooseInterests";
import { Interests } from "../../../types";
import { updateUserInfo } from "../../../API/api-utils";
import { useNavigate, useParams } from "react-router-dom";

interface ProfileEditProps {
  firstname: string;
  lastname: string;
  patronymic: string;
  tgName: string;
  gender: string;
  birthday: Date | string;
  description: string;
  userInterests: Interests[];
}

const DataTags = [
  { name: "программирование", color: "B472EE" },
  { name: "сериалы", color: "F18100" },
  { name: "музыка", color: "00C91E" },
  { name: "спорт", color: "AB2810" },
  { name: "чтение", color: "0099BB" },
  { name: "общение", color: "FFFA5A" },
  { name: "гейминг", color: "DF5B71" },
  { name: "рисование", color: "9C0B9E" },
  { name: "монтаж", color: "7CAB3B" },
  { name: "отдых", color: "161D9B" },
  { name: "математика", color: "793929" },
  { name: "физика", color: "217340" },
  { name: "обучение", color: "BA8D46" },
  { name: "правильноепитание", color: "EB9A93" },
];

const MAX_DESCRIPTION_LENGTH = 600;

export const ProfileEdit: FC<ProfileEditProps> = ({
  firstname,
  lastname,
  patronymic,
  tgName,
  gender,
  birthday,
  description,
  userInterests,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<Interests[]>(
    userInterests || []
  );

  const navigate = useNavigate();
  const { username } = useParams();

  const [availableInterests, setAvailableInterests] = useState<Interests[]>(
    userInterests
      ? DataTags.filter(
        (interest) => !userInterests.some((tag) => tag.name === interest.name)
      )
      : DataTags
  );

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    firstname,
    lastname,
    patronymic,
    tgName,
    gender,
    birthday: formatDate(birthday),
    description,
  });

  const { setMainInfo, user, token } = useStore();

  const handleCancelChanges = () => {
    const formattedBirthday = new Date(birthday).toISOString().split("T")[0];
    setFormData({
      firstname,
      lastname,
      patronymic,
      tgName,
      gender,
      birthday: formattedBirthday,
      description,
    });
  };

  const handleSaveChanges = async () => {
    const { firstname, lastname, patronymic, tgName, gender, birthday } =
      formData;
    if (firstname && lastname && patronymic && tgName && gender && birthday) {
      try {
        if (user) {
          await updateUserInfo(user.username, token, formData);
          setMainInfo(
            formData.firstname,
            formData.lastname,
            formData.patronymic,
            formData.gender,
            formData.tgName,
            formData.birthday,
            formData.description
          );
          navigate(`/Profile/${username}`)
        }
      } catch (error) {
        console.error("Ошибка при сохранении изменений:", error);
      }
    } else {
      alert("Заполните все поля, кроме описания, чтобы сохранить изменения");
    }
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

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className={styles.edit__container}>
      <h2 className={styles.edit__title}>Редактирование профиля</h2>

      <ul className={styles.list__parametrs}>
        <li>
          Фамилия:
          <input
            className={styles.parametr__input}
            value={formData.lastname}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </li>
        <li>
          Имя:
          <input
            className={styles.parametr__input}
            value={formData.firstname}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </li>
        <li>
          Отчество:
          <input
            className={styles.parametr__input}
            value={formData.patronymic}
            onChange={(e) => handleChange("patronymic", e.target.value)}
          />
        </li>
        <li className={styles.edit__parametr__telegram}>
          Telegram:
          <input
            className={`${styles.input__telegram} ${styles.parametr__input}`}
            value={formData.tgName}
            onChange={(e) => handleChange("tgName", e.target.value)}
          />
        </li>
        <li>
          Пол:
          <label
            className={`${styles.gender__picker__container} ${styles.gender__male}`}
          >
            <input
              className={styles.gender__picker__input}
              type="radio"
              checked={formData.gender === "Male"}
              onChange={() => handleChange("gender", "Male")}
            />
            мужской
          </label>
          <label
            className={`${styles.gender__picker__container} ${styles.gender__female}`}
          >
            <input
              type="radio"
              checked={formData.gender === "Female"}
              onChange={() => handleChange("gender", "Female")}
            />
            женский
          </label>
        </li>
        <li className={styles.date__picker__container}>
          Дата рождения:
          <input
            type="date"
            className={`${styles.parametr__input} ${styles.input__date}`}
            value={formData.birthday}
            onChange={(e) => handleChange("birthday", e.target.value)}
          />
        </li>
      </ul>

      <div>
        <div className={styles.about__me__container}>
          <div className={styles.about__me__title}>
            <p>О себе:</p>
            <p className={styles.about__me__stats}>
              {formData.description.length}/{MAX_DESCRIPTION_LENGTH}
            </p>
          </div>
          <textarea
            className={styles.about__me__textarea}
            placeholder="Расскажи другим что-нибудь о себе"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            maxLength={MAX_DESCRIPTION_LENGTH}
          />
        </div>
      </div>
      <ChooseInterests
        selectedInterests={selectedInterests}
        availableInterests={availableInterests}
        removeInterest={removeInterest}
        addInterest={addInterest}
      />
      <div className={styles.buttons__container}>
        <button
          onClick={handleSaveChanges}
          className={`${styles.button__activity} ${styles.button__activity__save}`}
        >
          Сохранить настройки
        </button>
        <button
          onClick={handleCancelChanges}
          className={`${styles.button__activity} ${styles.button__activity__cancel}`}
        >
          Отменить изменения
        </button>
      </div>
    </div>
  );
};
