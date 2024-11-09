// import { FC } from "react";
// import AcceptFriend from "../../../assets/icons/accept_friend_invite.svg";
// import RefuseFriend from "../../../assets/icons/refuse_friend_invite.svg";
// import AcceptGroup from "../../../assets/icons/accept_group_invite.svg";
// import RefuseGroup from "../../../assets/icons/close_popup.svg";
// import FriendInvite from "../../../assets/icons/friend_invite.svg";
// import AvatarIcon from "../../../assets/icons/avatar_icon.svg";
// import styles from "./Notice.module.css";
// import { Link } from "react-router-dom";
// import { avatars } from "../../../assets/images/avatars/avatars";
// import { acceptFriendshipReq, acceptNotice, cancelNotice, declineFriendshipReq } from "../../../API/api-utils";
// import { useStore } from "../../../store/app-store";

// type Group = {
//     id: number,
//     name: string,
//     chars: string,
//     description: string
//   }

// interface NoticeProps {
//   id: number;
//   name: string; 
//   groupName?: string;
//   groupId?:string;
//   avatar?: string; 
//   isGroupInvite: boolean; 
//   refreshGroups: ()=>void;
// }

// export const Notice: FC<NoticeProps> = ({
//   name,
//   groupName,
//   groupId,
//   isGroupInvite,
//   id,
//   avatar,
//   refreshGroups
// }) => {
//   const {token, user} = useStore();
//   const handleAcceptNotice = async() => {
//     refreshGroups(noticesList=>noticesList.filter(item => item.id !== id));
//     const result = acceptNotice(id.toString(),token);
//     console.log(result);
//   };

//   const handleCancelNotice = async() => {
//  const result = cancelNotice(id.toString(),token);
//  refreshGroups(noticesList=>noticesList.filter(item => item.id !== id));
//  console.log(result);
//   };

//   const handleAcceptReq = async () => {
//     user &&  await acceptFriendshipReq(name, user.username, token);
//     refreshGroups(noticesList=>noticesList.filter(item => item.id !== id));
//   }

//   const handleDeclineReq = async () => {
//     user && await declineFriendshipReq(name, user.username, token);
//     refreshGroups(noticesList=>noticesList.filter(item => item.id !== id));
//   }
//   const declineInvite =  async() => {
//       if (isGroupInvite)
//         handleCancelNotice
//       else
//       handleDeclineReq
//   }

//   const acceptInvite =  async() => {
//     if (isGroupInvite)
//       handleAcceptNotice
//     else
//     handleAcceptReq
// }


//   return (
//     <div className={styles.container}>
//       <div className={styles.avatarContainer}>
//         <img src={avatars[avatar as keyof typeof avatars]} alt="Avatar" className={styles.avatar} />
//         {!isGroupInvite && (
//           <img src={FriendInvite} alt="Friend Invite" className={styles.friendInviteIcon} />
//         )}
//       </div>

//       <div className={styles.textContainer}>
//         <Link to={`/Profile/${name}`} className={styles.name}>{name}</Link> 
//         {isGroupInvite ? ` приглашает вас в группу ` : ` хочет добавить вас в друзья `}
//         {isGroupInvite && <Link to={`/Group/${groupId}/Main`} className={styles.groupName}>{groupName}</Link>}
//       </div>

//       <div className={styles.actions}>
//         <button onClick={acceptInvite}
//           className={`${styles.actionButton} ${styles.acceptButton}`}
//           aria-label="Принять"
//         >
//           <img
//             src={isGroupInvite ? AcceptGroup : AcceptFriend}
//             alt="Accept"
//             className={styles.actionIcon}
//           />
//         </button>
//         <button onClick={declineInvite}
//           className={`${styles.actionButton} ${styles.declineButton}`}
//           aria-label="Отклонить"
//         >
//           <img
//             src={isGroupInvite ? RefuseGroup : RefuseFriend}
//             alt="Decline"
//             className={styles.actionIcon}
//           />
//         </button>
//       </div>
//     </div>
//   );
// };
import { FC } from "react";
import AcceptFriend from "../../../assets/icons/accept_friend_invite.svg";
import RefuseFriend from "../../../assets/icons/refuse_friend_invite.svg";
import AcceptGroup from "../../../assets/icons/accept_group_invite.svg";
import RefuseGroup from "../../../assets/icons/close_popup.svg";
import FriendInvite from "../../../assets/icons/friend_invite.svg";
import styles from "./Notice.module.css";
import { Link } from "react-router-dom";
import { avatars } from "../../../assets/images/avatars/avatars";
import { acceptFriendshipReq, acceptNotice, cancelNotice, declineFriendshipReq } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";

interface NoticeProps {
  id: number;
  name: string; 
  groupName?: string;
  groupId?: string;
  avatar?: string; 
  isGroupInvite: boolean; 
  refreshGroups: (noticesList: (prevList: any[]) => any[]) => void;
}

export const Notice: FC<NoticeProps> = ({
  name,
  groupName,
  groupId,
  isGroupInvite,
  id,
  avatar,
  refreshGroups
}) => {
  const { token, user } = useStore();

  const handleAcceptNotice = async () => {
    refreshGroups((noticesList) => noticesList.filter((item) => item.id !== id));
    const result = await acceptNotice(id.toString(), token);
    console.log(result);
  };

  const handleCancelNotice = async () => {
    const result = await cancelNotice(id.toString(), token);
    refreshGroups((noticesList) => noticesList.filter((item) => item.id !== id));
    console.log(result);
  };

  const handleAcceptReq = async () => {
    if (user) {
      await acceptFriendshipReq(user.username,name,  token);
      refreshGroups((noticesList) => noticesList.filter((item) => item.id !== id));
    }
  };

  const handleDeclineReq = async () => {
    if (user) {
      await declineFriendshipReq(user.username,name,  token);
      refreshGroups((noticesList) => noticesList.filter((item) => item.id !== id));
    }
  };

  const declineInvite = async () => {
    if (isGroupInvite) {
      await handleCancelNotice();
    } else {
      await handleDeclineReq();
    }
  };

  const acceptInvite = async () => {
    if (isGroupInvite) {
      await handleAcceptNotice();
    } else {
      await handleAcceptReq();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img src={avatars[avatar as keyof typeof avatars]} alt="Avatar" className={styles.avatar} />
        {!isGroupInvite && (
          <img src={FriendInvite} alt="Friend Invite" className={styles.friendInviteIcon} />
        )}
      </div>

      <div className={styles.textContainer}>
        <Link to={`/Profile/${name}`} className={styles.name}>{name}</Link> 
        {isGroupInvite ? ` приглашает вас в группу ` : ` хочет добавить вас в друзья `}
        {isGroupInvite && <Link to={`/Group/${groupId}/Main`} className={styles.groupName}>{groupName}</Link>}
      </div>

      <div className={styles.actions}>
        <button
          onClick={acceptInvite}
          className={`${styles.actionButton} ${styles.acceptButton}`}
          aria-label="Принять"
        >
          <img
            src={isGroupInvite ? AcceptGroup : AcceptFriend}
            alt="Accept"
            className={styles.actionIcon}
          />
        </button>
        <button
          onClick={declineInvite}
          className={`${styles.actionButton} ${styles.declineButton}`}
          aria-label="Отклонить"
        >
          <img
            src={isGroupInvite ? RefuseGroup : RefuseFriend}
            alt="Decline"
            className={styles.actionIcon}
          />
        </button>
      </div>
    </div>
  );
};
