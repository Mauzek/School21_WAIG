import { FC, useEffect } from "react";
import styles from "./Profile.module.css";
import { ProfileInfo } from "../../../components/ProfileComponents/ProfileInfo/ProfileInfo";
import { ProfileEdit } from "../../../components/ProfileComponents/ProfileEdit/ProfileEdit";
import { ProfilePrivacy } from "../../../components/ProfileComponents/ProfilePrivacy/ProfilePrivacy";
import { useLocation, useParams } from "react-router-dom";
import { useStore } from "../../../store/app-store";
import { Interests, User } from "../../../types";

const ProfilePage: FC = () => {
  const location = useLocation();
  const { username } = useParams<{ username: string }>();
  const { user } = useStore();
  let userData: User;
  let userInterests: Interests[];

  if (user.username === username) {
    userData = { ...user };
    userInterests = [
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
  } else {
    userData = {
      id: "1",
      username: "regxtk",
      birthday: "01/10/2000",
      description: "dadada",
      email: "lox@gmail.com",
      firstName: "Mary",
      lastName: "Dadada",
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

  useEffect(() => {}, []);

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
