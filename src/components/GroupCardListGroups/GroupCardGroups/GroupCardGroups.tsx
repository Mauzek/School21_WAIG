import { FC, useState } from "react";
import AddGroupIcon from "../../../assets/icons/add_group.svg";
import GroupWasAddIcon from "../../../assets/icons/group_was_add.svg";
import RemoveGroupIcon from "../../../assets/icons/close_popup.svg";
import styles from "./GroupCardGroups.module.css";
import { RemovePopup } from "../../RemovePopup/RemovePopup";
import { Link } from "react-router-dom";
import { Interests } from "../../../types";

interface GroupCardGroupsProps {
  groupID: number;
  name: string;
  chars: string;
  color: string;
  membersCount: number;
  description: string;
  interests: Interests[];
  isAdded: boolean;
}

export const GroupCardGroups: FC<GroupCardGroupsProps> = ({
  groupID,
  name,
  chars,
  membersCount,
  description,
  interests,
  isAdded,
  color,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const handleTogglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  const removeFriend = () => {
    setIsOpenPopup(false);
    console.log(`${name} был удален`);
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
          <h2 className={styles.groupCard__title}>{name}</h2>
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
            {interests.length > 3 && <li className={styles.groupCard__tag}>...</li>}
          </ul>
        </div>
      </Link>
      <div className={styles.groupCard__actions}>
        <button
          onClick={handleTogglePopup}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`${styles.groupCard__addButton} ${
            isAdded && styles.groupCard__wasAdd
          }`}
        >
          <img
            src={
              isAdded
                ? hovered
                  ? RemoveGroupIcon
                  : GroupWasAddIcon
                : AddGroupIcon
            }
            alt="Управление группой"
          />
        </button>
        {isOpenPopup && (
          <RemovePopup
            type="group"
            groupName={name}
            onCancel={handleTogglePopup}
            onConfirm={removeFriend}
          />
        )}
      </div>
    </article>
  );
};
