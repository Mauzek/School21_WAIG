import { useLocation } from "react-router-dom";
import { FriendsList } from "../../../components/FriendsList/FriendsList";
import styles from "./Friends.module.css";
import { FriendsRequestsList } from "../../../components/FriendsRequestsList/FriendsRequestsList";
import { useEffect, useState } from "react";
import { getFriendship, getFriendshipReq } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";

const FriendsPage = () => {
  const location = useLocation();
  const { user, token } = useStore();
  const [friendsReq, setFriendsReq] = useState([]);
  const [friends, setFriends] = useState<
    {
      username: string;
      firstname: string;
      lastname: string;
      profileImageId: string;
    }[]
  >([]);
  const removeFromState = (friendName:string) => {
     setFriendsReq((prevReqs) => prevReqs.filter(request => request.user.username !== friendName));
  };

  const removeFriend = (removeName:string) => {
    setFriends((prevReqs) => prevReqs.filter(element => element.username !== removeName));
    // console.log("1.4.2",friends.filter(element => element.username !==  "1") )
  };

  const RelocateReqToFriend = (username: string, firstname: string, lastname: string, profileImageId: string) => {
    const newFriend = { username, firstname, lastname, profileImageId };
  
    setFriends((prevFriends) => [...prevFriends, newFriend]);
  };
  

  useEffect(() => {
      const fetchFriendship = async () => {
      try {
        if (user?.username) {
          const response = await getFriendship(user.username, token);
          const resultFriends = await getFriendshipReq(user?.username,token);
          setFriends(response || []);
          setFriendsReq(resultFriends);
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
        <FriendsList friends={friends} removeFriend={removeFriend}/>
      )}
      {location.pathname === "/Friends/Requests" && <FriendsRequestsList friendsReq={friendsReq} removeFromState={removeFromState} RelocateReqToFriend={RelocateReqToFriend}/>}
    </main>
  );
};

export default FriendsPage;
