import { FC, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { ProfileInfo } from "../../../components/ProfileComponents/ProfileInfo/ProfileInfo";
import { ProfileEdit } from "../../../components/ProfileComponents/ProfileEdit/ProfileEdit";
import { ProfilePrivacy } from "../../../components/ProfileComponents/ProfilePrivacy/ProfilePrivacy";
import { useLocation, useParams, Navigate } from "react-router-dom";
import { useStore } from "../../../store/app-store";
import { Interests, User } from "../../../types";
import { getUser, getUserInterests } from "../../../API/api-utils";

const ProfilePage: FC = () => {
  const location = useLocation();
  const { username } = useParams<{ username: string }>();
  const { user, token } = useStore();

  const [userData, setUserData] = useState<User | null>(user || null);
  const [userInterests, setUserInterests] = useState<Interests[]>([]);

  
  useEffect(() => {
    const fetchUserData = async () => {
      if (username && username !== user?.username) {
        try {
          const fetchedUserData = await getUser(username, token);
          const fetchedUserInterests = await getUserInterests(username, token);
          setUserData(fetchedUserData);
          setUserInterests(fetchedUserInterests);
        } catch (error) {
          console.error("Ошибка при загрузке данных пользователя:", error);
        }
      } else {
        setUserData(user);
        try {
          if(user?.username){
            const fetchedUserInterests = await getUserInterests(user.username, token);
            setUserInterests(fetchedUserInterests);
          }
        } catch (error) {
          console.error("Ошибка при загрузке интересов:", error);
        }
      }
    };

    fetchUserData();
  }, [username, user, token]);

  const isAuthorizedUserPage =
    location.pathname === `/Profile/${username}/Privacy` ||
    location.pathname === `/Profile/${username}/Edit`;

  if (isAuthorizedUserPage && user?.username !== username) {
    return <Navigate to={`/Profile/${username}`} replace />;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.profile__back}>
      <div className={styles.profile__back__container}>
        {location.pathname === `/Profile/${username}` && (
          <ProfileInfo userData={userData} userInterests={userInterests} />
        )}
        {location.pathname === `/Profile/${username}/Privacy` && (
          <ProfilePrivacy email={userData.email} username={userData.username} />
        )}
        {location.pathname === `/Profile/${username}/Edit` && (
          <ProfileEdit {...userData} userInterests={userInterests} />
        )}
      </div>
    </main>
  );
};

export default ProfilePage;