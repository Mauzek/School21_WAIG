import { FC, useEffect, useState } from "react";
import { GroupCardListMain } from "../../components/GroupCardListMain/GroupCardListMain";
import styles from "./Home.module.css";
import { getTopGroupsByInterests } from "../../API/api-utils";
import { useStore } from "../../store/app-store";
import DataNotFound from "../../components/DataNotFound/DataNotFound";

export type Subscriber = {
  username: string;
  firstname: string;
  lastname: string;
  tgName: string;
};

export type Interest = {
  name: string;
  color: string;
};

export type Creator = {
  username: string;
  firstname: string;
  lastname: string;
};

export type Group = {
  id: number;
  chars: string;
  name: string;
  color: string;
  description: string;
  creator: Creator;
  subscribers: Subscriber[];
  interests: Interest[];
};

const HomePage: FC = () => {
  const [groupsData, setGroupsData] = useState<Record<string, Group[]>>({});
  const { token } = useStore();

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        if (!token) return;
        const responseAllGroups = await getTopGroupsByInterests(token);
        setGroupsData(responseAllGroups || {});
      } catch (error) {
        console.error("Ошибка при загрузке списка групп:", error);
      }
    };
    fetchAllGroups();
  }, [token]);

  if (Object.keys(groupsData).length === 0) return <DataNotFound size="large" />;

  return (
    <main className={styles.home_page__container}>
      {Object.entries(groupsData).map(([interestName, groups]) => {
        const sortedGroups = groups.sort(
          (a, b) => (b.subscribers.length || 0) - (a.subscribers.length || 0)
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
