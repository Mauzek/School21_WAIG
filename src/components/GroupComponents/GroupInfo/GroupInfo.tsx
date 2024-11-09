import { FC, useEffect, useState } from "react";
import styles from "./GroupInfo.module.css";
import ShareIcon from "../../../assets/icons/share_icon.svg";
import { InterestsList } from "../../InterestsList/InterestsList";
import { Group,} from "../../../types";
import { RemovePopup } from "../../RemovePopup/RemovePopup";
import { useNavigate } from "react-router-dom";
import { InviteFriendToGroup } from "../InviteFriendToGroup/InviteFriendToGroup";
import { getUserSubscribedGroups, inviteUserToGroup, leaveFromGroup, subscribeToGroup } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";

interface GroupInfoProps {
  groupInfo: Group ;
  friends: {firstname: string, lastname: string, profileImageId: string, username: string}[];
}

export const GroupInfo: FC<GroupInfoProps> = ({ groupInfo, friends }) => {
  const [isSubscriber,setIsSubscriber]=useState<boolean>(false);
  const {user,token} = useStore();
  const navigate = useNavigate();
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isOpenPopupInvite, setIsOpenPopupInvite] = useState<boolean>(false);
  const membersCount = [groupInfo.creator, ...groupInfo.subscribers];

  useEffect(()=>{
 const fetchSubscribedGroups = async () => {
  const groupsSubscribed = await getUserSubscribedGroups(user.username,token);
    console.log("test1.1.7",groupsSubscribed);
    const result = groupsSubscribed.some(group=>group.id===groupInfo.id);
    setIsSubscriber(result);
    console.log(groupInfo.id);
 }
 fetchSubscribedGroups();
    
  },[])

const SubscribeOnGroup = () => {
  subscribeToGroup(user?.username,groupInfo.id,token);
  console.log(user?.username, groupInfo.id, token);
  setIsSubscriber(true);
}



  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const togglePopupInvite = () => {
    setIsOpenPopupInvite((prev) => !prev);
  };

  const handleInvite = (invitedFriend:string) => {
    user&&inviteUserToGroup(groupInfo.id.toString(),user.username,invitedFriend,token);

  };

  const handleLeaveGroup = async () => {
    console.log("Покинул группу " + groupInfo.name);
    const result = user&& await leaveFromGroup(user?.username,groupInfo.id.toString(),token); 
    setIsOpenPopup((prev) => !prev);
    console.log(result);
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
        {isSubscriber?
          <button onClick={togglePopup} className={styles.button__leave_group}>
          Покинуть группу
        </button>:
        <button onClick={SubscribeOnGroup} className={styles.button__leave_group} style={{backgroundColor:"#44EB99"}}>
        Вступить
      </button>
        }
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
          groupId={groupInfo.id.toString()}
        />
      )}
    </section>
  );
};
