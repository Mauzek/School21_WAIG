import { FC } from "react";
import styles from "./FriendsList.module.css";
import { FriendCard } from "./FriendCard/FriendCard";
import { avatars } from "../../assets/images/avatars/avatars";


interface FriendsListProps {
  friends: {
    username: string;
    firstname: string;
    lastname: string;
    profileImageId: string;
  }[];
}

export const FriendsList: FC<FriendsListProps> = ({ friends }) => {
  return (
    <section className={styles.friend_list__container}>
      {friends.map((friend, index) => {
        const avatarId = friend.profileImageId as keyof typeof avatars;
        const friendName = `${friend.firstname} ${friend.lastname}`;
        return (
          <FriendCard
            key={index}
            name={friendName}
            username={friend.username}
            avatar={avatarId}
          />
        );
      })}
    </section>
  );
};
