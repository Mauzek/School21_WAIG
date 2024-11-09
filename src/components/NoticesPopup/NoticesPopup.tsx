import { FC, useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/close_popup.svg";
import { Notice } from "./Notice/Notice.tsx";
import styles from "./NoticesPopup.module.css";
import { getFriendshipReq, getNotificationsByUsername } from "../../API/api-utils.ts";
import { useStore } from "../../store/app-store.tsx";

type Group = {
  id: number,
  ownerID: number,
  name: string,
  chars: string,
  description: string
}

type Notice = {
  id: number;
  name: string;
  avatarUrl: string;
  isGroupInvite: boolean;
  group?: Group;
};

interface NoticeProps {
  isNoticesBtnActive: boolean;
  onClickNotices: () => void;
}

export const NoticesPopup: FC<NoticeProps> = ({
  isNoticesBtnActive,
  onClickNotices,
}) => {
  const [noticesList, setNoticesList] = useState<any>([]);

  const { user, token } = useStore();
  useEffect(() => {
    const fetchNotices = async () => {
      const result = await getNotificationsByUsername(user.username, token);
      const resultFriends = await getFriendshipReq(user?.username, token);

      const filteredGroupsNot = result.map(item => ({
        id: item.id,
        groupId: item.group.id,
        groupNameq: item.group.name,
        inviterUsername: item.inviter.username,
        userAvatar: item.inviter.profileImageId,
        isGroupInvite: true,
      }));

      const filteredFriendsNot = resultFriends.map(item => ({
        id: item.id,
        inviterUsername: item.user.username,
        friend: item.friend,
        userAvatar: item.user.profileImageId,
        isGroupInvite: false,
      }));

      const filteredNotes = [...filteredFriendsNot, ...filteredGroupsNot];
      setNoticesList(filteredNotes);
    }
    fetchNotices();
  }, [])
  return (
    <div
      className={`${styles.popup} ${isNoticesBtnActive ? styles.enter : styles.exit
        } `}
    >
      <div className={styles.header}>
        <span className={styles.title}>Уведомления</span>
        <button onClick={onClickNotices} className={styles.btn_close}>
          <img src={CloseIcon} alt="Close" className={styles.closeIcon} />
        </button>
      </div>
      <div className={styles.noticesList}>
        {noticesList && noticesList.map((notice) => (
          <Notice
            key={notice.id}
            id={notice.id}
            groupId={notice.groupId}
            name={notice.inviterUsername}
            avatar={notice.userAvatar}
            isGroupInvite={notice.isGroupInvite}
            groupName={notice.groupNameq}
            refreshGroups={setNoticesList}
          />
        ))}
      </div>
    </div>
  );
};
