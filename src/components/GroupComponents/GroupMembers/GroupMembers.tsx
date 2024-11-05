import { FC,} from "react";
import styles from "./GroupMembers.module.css";
import { Link } from "react-router-dom";
import { User } from "../../../types";
import { avatars } from "../../../assets/images/avatars/avatars";

interface GroupMembersProps {
  membersData: User[];
}

export const GroupMembers: FC<GroupMembersProps> = ({membersData}) => {

  return (
    <section className={styles.groupMembers__container}>
      {membersData.map((member, index) => (
        <Link
          key={index}
          to={`/Profile/${member.username}`}
          className={styles.card__link}
        >
          <article className={styles.member_card__container}>
            <div className={styles.avatarContainer}>
              <img
                src={avatars[member.profileImageId as keyof typeof avatars]}
                alt="avatar"
                className={styles.avatar}
              />
            </div>
            <div className={styles.info}>
              <h3
                className={styles.name}
              >{`${member.firstname} ${member.lastname}`}</h3>
              <p className={styles.username}>@{member.username}</p>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
};
