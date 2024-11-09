import { FC, useEffect, useState } from "react";
import styles from "./ProfileEdit.module.css";
import { useStore } from "../../../store/app-store";
import { ChooseInterests } from "../../CreateGroup/ChooseInterests/ChooseInterests";
import { Interests } from "../../../types";
import { getAllInterests, updateUserInfo} from "../../../API/api-utils";
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

  const [availableInterests, setAvailableInterests] = useState<Interests[]>([]);

  useEffect(() => {
    const fetchInterestsData = async () => {
      try {
        const responseData = await getAllInterests(token);
        if (responseData) {
          setAvailableInterests(
            responseData.filter(
              (interest: Interests) =>
                !userInterests.some(
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

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return ""; 
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
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
    birthDay: formatDate(birthday), 
    description,
    interests: selectedInterests
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
      birthDay: formattedBirthday,
      description,
      interests: selectedInterests
    });
  };

  const handleSaveChanges = async () => {
    const { firstname, lastname, patronymic, tgName, gender, birthDay, description, interests } = formData;
    
    console.log("Сохранение изменений:", formData); 
  
    if (firstname && lastname && patronymic && tgName && gender && birthday && interests) {
      try {
        if (user) {
          const dataToSend = {
            firstname,
            lastname,
            patronymic,
            tgName,
            gender,
            birthDay,
            description,
            interests: selectedInterests,
          };
  
          console.log("Отправляемые данные:", dataToSend);
          
          await updateUserInfo(user.username, token, dataToSend); // Отправка данных на сервер
        }
  
        setMainInfo(
          firstname,
          lastname,
          patronymic,
          gender,
          tgName,
          birthday,
          description
        );
  
        navigate(`/Profile/${username}`);
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
            onChange={(e) => handleChange("lastname", e.target.value)}
          />
        </li>
        <li>
          Имя:
          <input
            className={styles.parametr__input}
            value={formData.firstname}
            onChange={(e) => handleChange("firstname", e.target.value)}
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
            value={formData.birthDay}
            onChange={(e) => handleChange("birthDay", e.target.value)}
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
