import { FC } from "react";
import AcceptFriend from "../../../assets/icons/accept_friend_invite.svg";
import RefuseFriend from "../../../assets/icons/refuse_friend_invite.svg";
import AcceptGroup from "../../../assets/icons/accept_group_invite.svg";
import RefuseGroup from "../../../assets/icons/close_popup.svg";
import FriendInvite from "../../../assets/icons/friend_invite.svg";
import AvatarIcon from "../../../assets/icons/avatar_icon.svg";
import styles from "./Notice.module.css";
import { Link } from "react-router-dom";

type Group = {
    id: number,
    name: string,
    chars: string,
    description: string
  }

interface NoticeProps {
  name: string; 
  groupName?: Group,
  avatar?: string; // Аватар пользователя
  isGroupInvite: boolean; // Тип уведомления: приглашение в группу (true) или заявка в друзья (false)
}

export const Notice: FC<NoticeProps> = ({
  name,
  groupName,
  isGroupInvite,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img src={AvatarIcon} alt="Avatar" className={styles.avatar} />
        {!isGroupInvite && (
          <img src={FriendInvite} alt="Friend Invite" className={styles.friendInviteIcon} />
        )}
      </div>

      <div className={styles.textContainer}>
        <span className={styles.name}>{name}</span> 
        {isGroupInvite ? ` приглашает вас в группу ` : ` хочет добавить вас в друзья `}
        {isGroupInvite && <Link to={`/Group/${groupName?.id}`} className={styles.groupName}>{groupName?.name}</Link>}
      </div>

      <div className={styles.actions}>
        <button
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
