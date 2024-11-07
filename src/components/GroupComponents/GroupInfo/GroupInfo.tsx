import { FC, useState } from "react";
import styles from "./GroupInfo.module.css";
import ShareIcon from "../../../assets/icons/share_icon.svg";
import { InterestsList } from "../../InterestsList/InterestsList";
import { Group,} from "../../../types";
import { RemovePopup } from "../../RemovePopup/RemovePopup";
import { useNavigate } from "react-router-dom";
import { InviteFriendToGroup } from "../InviteFriendToGroup/InviteFriendToGroup";

interface GroupInfoProps {
  groupInfo: Group ;
  friends: {firstname: string, lastname: string, profileImageId: string, username: string}[];
}

export const GroupInfo: FC<GroupInfoProps> = ({ groupInfo, friends }) => {
  const navigate = useNavigate();
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isOpenPopupInvite, setIsOpenPopupInvite] = useState<boolean>(false);

  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const togglePopupInvite = () => {
    setIsOpenPopupInvite((prev) => !prev);
  };

  const handleInvite = () => {};

  const handleLeaveGroup = () => {
    setIsOpenPopup((prev) => !prev);
    navigate("/Groups/All");
  };

  return (
    <section className={styles.groupInfo__container}>
      <div className={styles.groupInfo__header}>
        <div
          className={styles.header__avatar_container}
          style={{ backgroundColor: `#${groupInfo.color}` }}
        >
          <span className={styles.header__avatar}>{groupInfo.chars}</span>
        </div>
        <div className={styles.header__mainInfo_container}>
          <h2 className={styles.mainInfo__group_title}>{groupInfo.name}</h2>
          <span className={styles.mainInfo__group_count_members}>
            Участников: {groupInfo.subscribers?.length}
          </span>
          <p className={styles.mainInfo__group_description}>
            {groupInfo.description}
          </p>
        </div>
        <div className={styles.header__buttons_container}>
          <button
            onClick={togglePopupInvite}
            className={styles.button__invite_friend}
          >
            Пригласить друга
            <img src={ShareIcon} className={styles.button__icon} />
          </button>
        </div>
      </div>
      <div className={styles.interests__container}>
        <InterestsList interests={groupInfo.interests} />
      </div>
      <div className={styles.footer__buttons_container}>
        <button onClick={togglePopup} className={styles.button__leave_group}>
          Покинуть группу
        </button>
      </div>
      {isOpenPopup && (
        <RemovePopup
          type="group"
          groupName={groupInfo.name}
          onCancel={togglePopup}
          onConfirm={handleLeaveGroup}
        />
      )}
      {isOpenPopupInvite && (
        <InviteFriendToGroup
          friends={friends}
          groupName={groupInfo.name}
          onCancel={togglePopupInvite}
          onConfirm={handleInvite}
        />
      )}
    </section>
  );
};
