import { FC } from "react";
import { User } from "../../types";
import { avatars } from "../../assets/images/avatars/avatars";
import styles from "./FriendsRequestsList.module.css";
import { RequestCard } from "./RequestCard/RequestCard";

interface FriendsListReqProps {
  friendsReq: {
    createdAt: string;
    friend: User;
    id: number;
    status: string;
    updatedAt: string;
    user: User;

  }[];
  removeFromState: (username: string) => void;
  RelocateReqToFriend: (username: string, firstname: string, lastname: string, profileImageId: string) => void;
}


export const FriendsRequestsList: FC<FriendsListReqProps> = ({ friendsReq, removeFromState, RelocateReqToFriend }) => {


  return (
    <section className={styles.friends_requests_list__container}>
      {friendsReq && friendsReq.map((request) => {
        const friend = request.user;
        const avatarId = friend.profileImageId as keyof typeof avatars;
        return (
          <RequestCard
            key={friend.username}
            firstname={friend.firstname}
            lastname={friend.lastname}
            description={friend.description}
            username={friend.username}
            avatar={avatarId}
            removeFromState={removeFromState}
            RelocateReqToFriend={RelocateReqToFriend}
          />
        );
      })}
    </section>
  );
};
