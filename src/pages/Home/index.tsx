import { FC, useEffect, useState } from "react";
import { GroupCardListMain } from "../../components/GroupCardListMain/GroupCardListMain";
import styles from "./Home.module.css";
import { Interests } from "../../types";
import { getAllGroups } from "../../API/api-utils";
import { useStore } from "../../store/app-store";
import DataNotFound from "../../components/DataNotFound/DataNotFound";

export type Group = {
  id: string;
  chars: string;
  name: string;
  color: string;
  description: string;
  creator: { username: string; firstname: string };
  subscribers: string[]; 
  interests: Interests[];
};

const HomePage: FC = () => {
  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const { token } = useStore();

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        if (!token) return;
        const responseAllGroups = await getAllGroups(token);
        const sanitizedGroups = responseAllGroups.map((group: Group) => ({
          ...group,
          subscribers: group.subscribers || [], 
          interests: group.interests || [] 
        }));
        setGroupsData(sanitizedGroups || []);
      } catch (error) {
        console.error("Ошибка при загрузке списка групп:", error);
      }
    };
    fetchAllGroups();
  }, [token]);

  if (groupsData.length === 0) return <DataNotFound size="large"/>; 

  const groupedByInterest = groupsData.reduce((acc, group) => {
    group.interests.forEach((interest) => {
      if (!acc[interest.name]) {
        acc[interest.name] = [];
      }
      acc[interest.name].push(group);
    });
    return acc;
  }, {} as Record<string, Group[]>);

  return (
    <main className={styles.home_page__container}>
      {Object.entries(groupedByInterest).map(([interestName, groups]) => {
        const sortedGroups = groups.sort(
          (a, b) => (b.subscribers.length+1 || 0) - (a.subscribers.length+1 || 0)
        );

        return (
          <GroupCardListMain
            key={interestName}
            label={interestName}
            groups={sortedGroups}
          />
        );
      })}
    </main>
  );
};

export default HomePage;
