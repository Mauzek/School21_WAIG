import { useLocation } from "react-router-dom";
import { FriendsList } from "../../../components/FriendsList/FriendsList";
import styles from "./Friends.module.css";
import { FriendsRequestsList } from "../../../components/FriendsRequestsList/FriendsRequestsList";
import { useEffect, useState } from "react";
import { getFriendship } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";

const FriendsPage = () => {
  const location = useLocation();
  const { user, token } = useStore();
  const [friends, setFriends] = useState<
    {
      username: string;
      firstname: string;
      lastname: string;
      profileImageId: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchFriendship = async () => {
      try {
        if (user?.username) {
          const response = await getFriendship(user.username, token);
          setFriends(response || []);
        }
      } catch (error) {
        console.error("Ошибка при загрузке списка друзей:", error);
      }
    };

    fetchFriendship();
  }, [user?.username, token]);

  return (
    <main className={styles.friends_main__container}>
      {location.pathname === "/Friends/All" && (
        <FriendsList friends={friends} />
      )}
      {location.pathname === "/Friends/Requests" && <FriendsRequestsList />}
    </main>
  );
};

export default FriendsPage;
