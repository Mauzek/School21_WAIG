import { FC } from "react";
import { Group } from "../../types";
import { GroupCardGroups } from "./GroupCardGroups/GroupCardGroups";
import styles from "./GroupCardListGroups.module.css";
import { useStore } from "../../store/app-store";

interface GroupCardGroupsProps {
  groups: Group[];
}

export const GroupCardListGroups: FC<GroupCardGroupsProps> = ({ groups }) => {
  const { user } = useStore();
  return (
    <section className={styles["group-list"]}>
      {groups.map((group) => (
        <GroupCardGroups
          key={group.id}
          creator={group.creator}
          groupID={group.id}
          name={group.name}
          chars={group.chars}
          description={group.description}
          color={group.color}
          membersCount={group.subscribers.length + 1}
          interests={group.interests}
          isAdded={group.subscribers.some(
            (subscriber) => subscriber.username === user?.username
          )}
        />
      ))}
    </section>
  );
};
