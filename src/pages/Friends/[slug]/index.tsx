import { useLocation } from "react-router-dom";
import { FriendsList } from "../../../components/FriendsList/FriendsList";
import styles from "./Friends.module.css";
import { FriendsRequestsList } from "../../../components/FriendsRequestsList/FriendsRequestsList";

const FriendsPage = () => {
  const location = useLocation();

  return (
    <main className={styles.friends_main__container}>
        {location.pathname === "/Friends/All" && <FriendsList/>}
        {location.pathname === "/Friends/Requests" && <FriendsRequestsList/>}
    </main>
  );
};

export default FriendsPage;
