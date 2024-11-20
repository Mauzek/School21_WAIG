import { FC, useEffect, useState } from "react";
import styles from "./InviteFriendToGroup.module.css";
import ClosePopup from "../../../assets/icons/close_popup.svg";
import { avatars } from "../../../assets/images/avatars/avatars";
import { Link } from "react-router-dom";
import { getAvailableUsersForInvite } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";
import DataNotFound from "../../DataNotFound/DataNotFound";

interface InviteFriendToGroupProps {
  friends: {
    firstname: string;
    lastname: string;
    profileImageId: string;
    username: string;
  }[];
  groupName?: string;
  onConfirm: (friendName: string) => void;
  onCancel: () => void;
  groupId: string;
}

export const InviteFriendToGroup: FC<InviteFriendToGroupProps> = ({
  friends,
  groupName,
  onConfirm,
  onCancel,
  groupId,
}) => {
  const [availableUsers, setAvailableUsers] = useState();
  const { user, token } = useStore();
  useEffect(() => {
    const fetchAvailableUsers = async () => {
      const result = await getAvailableUsersForInvite(
        groupId,
        user.username,
        token
      );

      const commonElements = result.filter((item1) =>
        friends.some((item2) => item1.username === item2.username)
      );
      setAvailableUsers(commonElements);
    };
    fetchAvailableUsers();
  }, []);

  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup_container}>
        <div className={styles.popup_header}>
          <h2 className={styles.popup_header__title}>
            Пригласить друга в <span className={styles.title}>{groupName}</span>
          </h2>
          <button onClick={onCancel} className={styles.popup_header__close}>
            <img src={ClosePopup} alt="Закрыть" />
          </button>
        </div>
        <div className={styles.popup_friends}>
          {availableUsers && availableUsers.length > 0 ? (
            availableUsers.map((friend, index) => (
              <article key={index} className={styles.friend_card}>
                <Link to={`/Profile/${friend.username}`} className={styles.friend_card__main_container}>
                  <div className={styles.friend_card__avatar_container}>
                    <img
                      className={styles.friend_card__avatar}
                      src={
                        avatars[friend.profileImageId as keyof typeof avatars]
                      }
                      alt={friend.username}
                    />
                  </div>
                  <div className={styles.friend_card__description}>
                    <p className={styles.friend_card__name}>
                      {friend.firstname} {friend.lastname}
                    </p>
                    <p className={styles.friend_card__username}>
                      {friend.username}
                    </p>
                  </div>
                </Link>
                <button
                  className={styles.friend_card__invite_button}
                  onClick={() => {
                    onConfirm(friend.username);
                    setAvailableUsers(
                      (prev) =>
                        prev?.filter(
                          (item) => item.username !== friend.username
                        ) || null
                    );
                  }}
                >
                  Пригласить
                </button>
              </article>
            ))
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className={styles.popup_footer}>
          <button onClick={onCancel} className={styles.popup_footer__cancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
