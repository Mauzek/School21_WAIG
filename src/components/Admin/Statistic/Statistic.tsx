import { FC, useEffect, useState } from "react";
import { getAllGroups, getAllInterests, getAllUsers } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";

type StatisticData = {
  UsersCount: number,
  GroupsCount: number,
  InterestCount: number
}

export const Statistic: FC = () => {
  const { token } = useStore();
  const [statisticData, setStatisticData] = useState<StatisticData>({ UsersCount: 0, GroupsCount: 0, InterestCount: 0 });

  useEffect(() => {
    const fetchData = async () => {

      const [users, groups, interests] = await Promise.all([
        getAllUsers(token),
        getAllGroups(token),
        getAllInterests(token),
      ]);
      setStatisticData({
        UsersCount: users.length,
        GroupsCount: groups.length,
        InterestCount: interests.length,
      });
    }
    fetchData();

  }, []);
  return (<>
    <p>Всего пользователей: {statisticData&&statisticData.UsersCount}</p>
    <p>Всего групп: {statisticData&&statisticData.GroupsCount}</p>
    <p>Всего интересов: {statisticData&&statisticData.InterestCount}</p>
  </>);
}