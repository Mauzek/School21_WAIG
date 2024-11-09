import { FC, useEffect, useState } from "react";
import styles from "./GroupInfo.module.css";
import ShareIcon from "../../../assets/icons/share_icon.svg";
import { InterestsList } from "../../InterestsList/InterestsList";
import { Group, } from "../../../types";
import { RemovePopup } from "../../RemovePopup/RemovePopup";
import { useNavigate } from "react-router-dom";
import { InviteFriendToGroup } from "../InviteFriendToGroup/InviteFriendToGroup";
import { inviteUserToGroup, leaveFromGroup, subscribeToGroup } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";
import { deleteGroupById } from "../../../API/api-utils";

interface GroupInfoProps {
  groupInfo: Group;
  friends: { firstname: string, lastname: string, profileImageId: string, username: string }[];
}

export const GroupInfo: FC<GroupInfoProps> = ({ groupInfo, friends }) => {
  const [isSubscriber, setIsSubscriber] = useState<boolean>(false);
  const { user, token } = useStore();
  const navigate = useNavigate();
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isOpenPopupInvite, setIsOpenPopupInvite] = useState<boolean>(false);
  const membersCount = [groupInfo.creator, ...groupInfo.subscribers];

  useEffect(() => {
    const fetchSubscribedGroups = async () => {
      // const groupsSubscribed = await getUserSubscribedGroups(user.username, token);
      const groupsSubscribed= groupInfo.subscribers;
      console.log("test1.1.7", groupInfo);

      if (groupInfo.creator.username === user?.username)
        setIsSubscriber(true);
      else {
        const result = groupsSubscribed.some(elem => elem.username == user.username);
        setIsSubscriber(result);
      }
      console.log(groupInfo.id);
    }
    fetchSubscribedGroups();

  }, [])

  const SubscribeOnGroup = () => {
    subscribeToGroup(user?.username, groupInfo.id, token);
    console.log(user?.username, groupInfo.id, token);
    setIsSubscriber(true);
  }



  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const togglePopupInvite = () => {
    setIsOpenPopupInvite((prev) => !prev);
  };

  const handleInvite = (invitedFriend: string) => {
    user && inviteUserToGroup(groupInfo.id.toString(), user.username, invitedFriend, token);

  };

  const handleLeaveGroup = async () => {
    console.log("Покинул группу " + groupInfo.name);
    user && await leaveFromGroup(user?.username, groupInfo.id.toString(), token);
  };
  const handleRemoveGroup = () => {
    deleteGroupById(token, groupInfo.id.toString(),)
    setIsOpenPopup((prev) => !prev);
    navigate("/Groups/All");
  };

  // const handleLeaveGroup = () => {
  //   setIsOpenPopup((prev) => !prev);
  //   console.log(result);
  //   navigate("/Groups/All");
  // };

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
            Участников: {membersCount.length}
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
        {isSubscriber ?
          <button onClick={togglePopup} className={styles.button__leave_group}>
            {user?.username === groupInfo.creator.username ? "Удалить группу" : "Выйти из группы"}
          </button> :
          <button onClick={SubscribeOnGroup} className={styles.button__leave_group} style={{ backgroundColor: "#44EB99" }}>
            Вступить
          </button>
        }
      </div>
      {isOpenPopup && (
        <RemovePopup
          type={user?.username === groupInfo.creator.username ?"group remove":"group"}
          groupName={groupInfo.name}
          onCancel={togglePopup}
          onConfirm={user?.username === groupInfo.creator.username ? handleRemoveGroup : handleLeaveGroup}
        />
      )}
      {isOpenPopupInvite && (
        <InviteFriendToGroup
          friends={friends}
          groupName={groupInfo.name}
          onCancel={togglePopupInvite}
          onConfirm={handleInvite}
          groupId={groupInfo.id.toString()}
        />
      )}
    </section>
  );
};
