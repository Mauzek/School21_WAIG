import { FC } from "react";
import { Group } from "../../types";
import { GroupCardGroups } from "./GroupCardGroups/GroupCardGroups";
import styles from "./GroupCardListGroups.module.css";

interface GroupCardGroupsProps {
  groups: Group[];
}

export const GroupCardListGroups: FC<GroupCardGroupsProps> = ({ groups }) => {
  return (
    <section className={styles["group-list"]}>
      {groups.map((group) => (
        <GroupCardGroups
        key={group.id}
          groupID={group.id}
          name={group.name}
          chars={group.chars}
          description={group.description}
          color={group.color}
          membersCount={group.membersCount}
          tags={group.tags}
          isAdded={true}
        />
      ))}
    </section>
  );
};
