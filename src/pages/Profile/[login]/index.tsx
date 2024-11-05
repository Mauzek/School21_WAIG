import { FC, useEffect } from "react";
import styles from "./Profile.module.css";
import { ProfileInfo } from "../../../components/ProfileComponents/ProfileInfo/ProfileInfo";
import { ProfileEdit } from "../../../components/ProfileComponents/ProfileEdit/ProfileEdit";
import { ProfilePrivacy } from "../../../components/ProfileComponents/ProfilePrivacy/ProfilePrivacy";
import { useLocation, useParams } from "react-router-dom";
import { useStore } from "../../../store/app-store";
import { Interests, User } from "../../../types";
import { getJWT, getUserInterests } from "../../../API/api-utils";
import { endpoints } from "../../../API/config";

const ProfilePage: FC = () => {
  const location = useLocation();
  const { username } = useParams<{ username: string }>();
  const { user } = useStore();
  let userData: User;
  let userInterests: Interests[];

  if (user.username === username) {
    userData = { ...user };
    userInterests = [
      { name: "сериалы", color: "#F18100" },
      { name: "чтение", color: "#0099BB" },
      { name: "общение", color: "#FFFA5A" },
      { name: "гейминг", color: "#DF5B71" },
      { name: "рисование", color: "#9C0B9E" },
      { name: "отдых", color: "#161D9B" },
      { name: "математика", color: "#793929" },
      { name: "физика", color: "#217340" },
      { name: "обучение", color: "#BA8D46" },
    ];
    // userInterests = await fetchUser();
  } else {
    userData = {
      id: "1",
      username: "regxtk",
      birthday: "01/10/2000",
      description: "dadada",
      email: "lox@gmail.com",
      firstname: "Mary",
      lastname: "Dadada",
      patronymic: "Batkonva",
      gender: "Ж",
      isAdmin: false,
      profileImageId: "frog",
      tgName: "regxtk",
    };
    userInterests = [
      { name: "сериалы", color: "#F18100" },
      { name: "чтение", color: "#0099BB" },
      { name: "общение", color: "#FFFA5A" },
      { name: "гейминг", color: "#DF5B71" },
      { name: "рисование", color: "#9C0B9E" },
      { name: "отдых", color: "#161D9B" },
      { name: "математика", color: "#793929" },
      { name: "физика", color: "#217340" },
      { name: "обучение", color: "#BA8D46" },
    ];
  }
  useEffect(() => {
    const fetchUser = async () => {
      const token = getJWT();
      if (token) {
        try {
          const asdsdasd: (Response | Error) = await getUserInterests(endpoints.getUserInterests(user.username), token);
          return asdsdasd;
        } catch (error) {
          console.error("Ошибка при получении пользователя:", error);
        }
      }

    };
    
    // userInterests = await fetchUser();

     // Вызов функции для получения пользователя
  }, []);

  return (
    <main className={styles.profile__back}>
      <div className={styles.profile__back__container}>
        {location.pathname === `/Profile/${username}` && (
          <ProfileInfo userData={userData} userInterests={userInterests} />
        )}
        {location.pathname === `/Profile/${username}/Privacy` && (
          <ProfilePrivacy />
        )}
        {location.pathname === `/Profile/${username}/Edit` && <ProfileEdit />}
      </div>
    </main>
  );
};

export default ProfilePage;
