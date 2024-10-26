import { FC } from "react";
import CloseIcon from "../../assets/icons/close_popup.svg";
import { Notice } from "./Notice/Notice.tsx";
import styles from "./NoticesPopup.module.css";

type Group = {
  id: number,
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

const mockNotices: Notice[] = [
  {
    id: 1,
    name: "regxtk",
    avatarUrl: "https://example.com/avatar1.png",
    isGroupInvite: true,
    group: {
      id: 1,
      name: "C# все дела",
      chars: "C#",
      description: ""
    },
  },
  {
    id: 2,
    name: "regxtk",
    avatarUrl: "https://example.com/avatar2.png",
    isGroupInvite: false,
  },
  {
    id: 3,
    name: "regxtk",
    avatarUrl: "https://example.com/avatar2.png",
    isGroupInvite: false,
  },
  {
    id: 4,
    name: "regxtk",
    avatarUrl: "https://example.com/avatar2.png",
    isGroupInvite: true,
    group: {
      id: 2,
      name: "Таверна",
      chars: "WW",
      description: ""
    },
  },
];

export const NoticesPopup: FC<NoticeProps> = ({
  isNoticesBtnActive,
  onClickNotices,
}) => {
  return (
    <div
      className={`${styles.popup} ${
        isNoticesBtnActive ? styles.enter : styles.exit
      } `}
    >
      <div className={styles.header}>
        <span className={styles.title}>Уведомления</span>
        <button onClick={onClickNotices} className={styles.btn_close}>
          <img src={CloseIcon} alt="Close" className={styles.closeIcon} />
        </button>
      </div>

      <div className={styles.noticesList}>
        {mockNotices.map((notice) => (
          <Notice
            key={notice.id}
            id={notice.id}
            name={notice.name}
            avatar={notice.avatarUrl}
            isGroupInvite={notice.isGroupInvite}
            groupName={notice.group}
          />
        ))}
      </div>
    </div>
  );
};
