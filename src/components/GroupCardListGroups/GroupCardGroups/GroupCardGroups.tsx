import { FC, useState } from "react";
import AddGroupIcon from "../../../assets/icons/add_group.svg";
import GroupWasAddIcon from "../../../assets/icons/group_was_add.svg";
import RemoveGroupIcon from "../../../assets/icons/close_popup.svg";
import styles from "./GroupCardGroups.module.css";
import { RemovePopup } from "../../RemovePopup/RemovePopup";
import { Link } from "react-router-dom";
import { Interests, User } from "../../../types";
import { leaveFromGroup, subscribeToGroup } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";

interface GroupCardGroupsProps {
  groupID: number;
  name: string;
  chars: string;
  color: string;
  membersCount: number;
  description: string;
  interests: Interests[];
  isAdded: boolean;
  creator: User;
}

export const GroupCardGroups: FC<GroupCardGroupsProps> = ({
  groupID,
  name,
  chars,
  membersCount: initialMembersCount,
  description,
  interests,
  isAdded: initialIsAdded,
  color,
  creator,
}) => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const { user, token } = useStore();
  const [isAdded, setIsAdded] = useState<boolean>(initialIsAdded);
  const [membersCount, setMembersCount] = useState<number>(initialMembersCount);
  const handleTogglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const removeGroup = () => {
    if (user) {
      leaveFromGroup(user.username, groupID.toString(), token);
      setIsAdded(false);
      setMembersCount((prev) => prev - 1);
    }
    setIsOpenPopup((prev) => !prev);
  };

  const handleJoinToGroup = async () => {
    if (user) {
      await subscribeToGroup(user.username, groupID, token);
      setIsAdded(true);
      setMembersCount((prev) => prev + 1);
    }
  };

  return (
    <article className={styles.groupCard}>
      <Link to={`/Group/${groupID}/Main`} className={styles.groupCard_link}>
        <div className={styles.groupCard__avatar}>
          <span
            className={styles.groupCard__avatarText}
            style={{ backgroundColor: `#${color}` }}
          >
            {chars}
          </span>
        </div>
        <div className={styles.groupCard__content}>
          <h2 className={styles.groupCard__title}>
            {name}{" "}
            {creator.username === user?.username && (
              <p className={styles.groupCard__creatorText}>Ваша группа</p>
            )}
          </h2>
          <span className={styles.groupCard__membersCount}>
            {membersCount} участников
          </span>
          <p className={styles.groupCard__description}>{description}</p>
          <ul className={styles.groupCard__tags}>
            {interests.slice(0, 3).map((interest, index) => (
              <li key={index} className={styles.groupCard__tag}>
                <span
                  className={styles.groupCard__tagColor}
                  style={{ backgroundColor: `#${interest?.color}` }}
                />
                #{interest?.name}
              </li>
            ))}
            {interests.length > 3 && (
              <li className={styles.groupCard__tag}>...</li>
            )}
          </ul>
        </div>
      </Link>
      <div className={styles.groupCard__actions}>
        <button
          style={creator.username === user?.username ? { display: "none" } : {}}
          onClick={isAdded ? handleTogglePopup : handleJoinToGroup}
          className={`${styles.groupCard__addButton} ${
            isAdded ? styles.groupCard__wasAdd : ""
          }`}
        >
          <img
            src={
              isAdded
                ? isOpenPopup
                  ? RemoveGroupIcon
                  : GroupWasAddIcon
                : AddGroupIcon
            }
            alt="Управление группой"
          />
        </button>
        {isOpenPopup && isAdded && (
          <RemovePopup
            type="group"
            groupName={name}
            onCancel={handleTogglePopup}
            onConfirm={removeGroup}
          />
        )}
      </div>
    </article>
  );
};
