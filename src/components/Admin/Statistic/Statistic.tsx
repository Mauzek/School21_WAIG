import { FC, useEffect, useState } from "react";
import { statistics } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";

type StatisticData = {
  userCount: number,
  groupCount: number,
  interestCount: number
}

export const Statistic: FC = () => {
  const { token } = useStore();
  const [statisticData, setStatisticData] = useState<StatisticData>();
  useEffect(() => {
    const fetchData = async () => {
      setStatisticData(await statistics(token));
    }
    fetchData();
  }, []);
  return (<>
    <p>Всего пользователей: {statisticData && statisticData.userCount}</p>
    <p>Всего групп: {statisticData && statisticData.groupCount}</p>
    <p>Всего интересов: {statisticData && statisticData.interestCount}</p>
  </>);
}