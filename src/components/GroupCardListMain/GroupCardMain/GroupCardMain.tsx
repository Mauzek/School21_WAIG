import { FC } from "react";
import styles from "./GroupCardMain.module.css";
import { Group } from "../../../pages/Home";

interface GroupCardMainProps {
  group: Group;
}

export const GroupCardMain: FC<GroupCardMainProps> = ({ group }) => {
  return (
    <article className={styles.group_card}>
      <div className={styles.group_card__header}>
        <span
          className={styles.group_card__avatar}
          style={{ backgroundColor: `#${group.color}` }}
        >
          {group.chars}
        </span>
        <h3 className={styles.group_card__title}>{group.name}</h3>
      </div>
      <div className={styles.group_card__body}>
        <p className={styles.group_card__description}>{group.description}</p>
        <span className={styles.group_card__members}>
          Участники: {group.subscribers.length + 1}
        </span>
      </div>
    </article>
  );
};
