import { useLocation } from "react-router-dom";
import { FriendsList } from "../../../components/FriendsList/FriendsList";
import styles from "./Friends.module.css";
import { FriendsRequestsList } from "../../../components/FriendsRequestsList/FriendsRequestsList";
import { useEffect, useState } from "react";
import { getFriendship, getFriendshipReq } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";
import { ConfigProvider, Pagination } from "antd";

const FriendsPage = () => {
  const location = useLocation();
  const { user, token } = useStore();
  const [friendsReq, setFriendsReq] = useState([]);
  const [paginationData, setPaginationData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [friends, setFriends] = useState<
    {
      username: string;
      firstname: string;
      lastname: string;
      profileImageId: string;
    }[]
  >([]);
  const removeFromState = (friendName: string) => {
    setFriendsReq((prevReqs) =>
      prevReqs.filter((request) => request.user.username !== friendName)
    );
  };

  const removeFriend = (removeName: string) => {
    setFriends((prevReqs) =>
      prevReqs.filter((element) => element.username !== removeName)
    );
  };

  const RelocateReqToFriend = (
    username: string,
    firstname: string,
    lastname: string,
    profileImageId: string
  ) => {
    const newFriend = { username, firstname, lastname, profileImageId };

    setFriends((prevFriends) => [...prevFriends, newFriend]);
  };

  useEffect(() => {
    const fetchFriendship = async () => {
      try {
        if (user?.username) {
          const response = await getFriendship(user.username, currentPage, 12, token);
          const resultFriends = await getFriendshipReq(user?.username, token);
          setFriends(response.content || []);
          setPaginationData(response);
          setFriendsReq(resultFriends);
        }
      } catch (error) {
        console.error("Ошибка при загрузке списка друзей:", error);
      }
    };

    fetchFriendship();
  }, [user?.username, token, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber - 1);
  };

  return (
    <ConfigProvider
    theme={{
      components: {
        Pagination: {
          itemActiveBg: "#44EB99",
          colorPrimary: "#000",
          itemBg: "#3E4857",
          colorText: "#ffffff",
          colorBorder: "#000",
          colorBgTextHover: "rgba(255, 255, 255, 0.1)",
          colorPrimaryHover: "none",
          itemSize: 42,
        },
      },
    }}
    >
      <main className={styles.friends_main__container}>
        {location.pathname === "/Friends/All" &&
          (friends.length > 0 ? (
            <FriendsList friends={friends} removeFriend={removeFriend} />
          ) : (
            <DataNotFound size="medium" />
          ))}

        {location.pathname === "/Friends/Requests" &&
          (friendsReq.length > 0 ? (
            <FriendsRequestsList
              friendsReq={friendsReq}
              removeFromState={removeFromState}
              RelocateReqToFriend={RelocateReqToFriend}
            />
          ) : (
            <DataNotFound size="medium" />
          ))}
          {paginationData.totalPages > 1 && (
          <Pagination
            key={location.pathname}
            onChange={handlePageChange}
            align="center"
            showSizeChanger={false}
            current={currentPage+1}
            total={paginationData.totalElements}
            defaultPageSize={12}
          />
        )}
      </main>
    </ConfigProvider>
  );
};

export default FriendsPage;
