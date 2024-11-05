import { GroupCardListGroups } from "../../../components/GroupCardListGroups/GroupCardListGroups";
import { Group } from "../../../types";
import styles from "./Groups.module.css";
import AddGroup from "../../../assets/icons/add_group.svg";
import { Link, useLocation } from "react-router-dom";
import { CreateGroup } from "../../../components/CreateGroup/CreateGroup";
import { useEffect, useState } from "react";
import { useStore } from "../../../store/app-store";
import { getAllGroups, getUserCreatedGroups } from "../../../API/api-utils";

// const groups: Group[] = [
//   {
//     id: 1,
//     creatorId: "1",
//     name: "Программируем с Бобом",
//     chars: "C#",
//     color: "#F6FF00",
//     membersCount: 123,
//     description:
//       "Небольшое описание такой хорошей группе не помешает. ва ыва ыва ываукукпук укпу кпук пвапвып ддд ыва ыва ",
//     tags: [
//       {  name: "Программирование", color: "#B472EE" },
//       {  name: "Музыка", color: "#00C91E" },
//       {  name: "Чтение", color: "#0099BB" },
//       {  name: "Чтение", color: "#0099BB" },
//     ],
//   },
//   {
//     id: 2,
//     creatorId: "2",
//     name: "Программируем с Бибой",
//     chars: "C++",
//     color: "#F6FF00",
//     membersCount: 86,
//     description: "Это описание для другой группы, оно интересное и полезное.",
//     tags: [
//       { name: "Программирование", color: "#B472EE" },
//       {  name: "Музыка", color: "#00C91E" },
//     ],
//   },
//   {
//     id: 3,
//     creatorId: "3",
//     name: "Изучаем Python",
//     chars: "Py",
//     color: "#00ADEF",
//     membersCount: 58,
//     description: "Группа для обсуждения Python и библиотек.",
//     tags: [{ name: "Программирование", color: "#B472EE" }],
//   },
//   {
//     id: 4,
//     creatorId: "4",
//     name: "Frontend Fun",
//     chars: "JS",
//     color: "#FFEB3B",
//     membersCount: 200,
//     description: "Frontend-разработка для всех уровней.",
//     tags: [
//       {  name: "Программирование", color: "#B472EE" },
//       {  name: "UI/UX", color: "#FFC107" },
//     ],
//   },
//   {
//     id: 5,
//     creatorId: "5",
//     name: "Бэкенд - сила",
//     chars: "Nod",
//     color: "#9CCC65",
//     membersCount: 77,
//     description: "Углубленное изучение серверных технологий.",
//     tags: [{ name: "Бэкенд", color: "#8BC34A" }],
//   },
//   {
//     id: 6,
//     creatorId: "6",
//     name: "UI/UX дизайн",
//     chars: "UX",
//     color: "#E91E63",
//     membersCount: 34,
//     description: "Дизайн интерфейсов и UX исследования.",
//     tags: [{  name: "Дизайн", color: "#FF5722" }],
//   },
// ];

const GroupsPage = () => {
  const location = useLocation();
  const {user ,token} = useStore();
  const [groups, setGroups] = useState<Group[]>([]);
  const [createdGroups, setCreatedGroups] = useState<Group[]>([]);

  useEffect(()=>{
    const FetchAllGroup = async () => {
      try {
        const responseAllGroups = await getAllGroups(token);
        setGroups(responseAllGroups || []);
        const responseCreatedGroups = await getUserCreatedGroups(user.username, token);
        setCreatedGroups(responseCreatedGroups || []);
      } catch (error) {
        console.error("Ошибка при загрузке списка друзей:", error);
      }
    }
    FetchAllGroup();
  },[])
  

  return (
    <main className={styles.groupsPage}>
      {location.pathname === "/Groups/All" && (
        <GroupCardListGroups groups={groups} />
      )}
      {location.pathname === "/Groups/Subscriptions" && (
        <GroupCardListGroups groups={groups} />
      )}
      {location.pathname === "/Groups/Managed" && (
        <GroupCardListGroups groups={createdGroups} />
      )}
      {location.pathname === "/Groups/Managed" && (
        <Link to="/Groups/Create" className={styles.groupsPage__addBtn}>
          <img className={styles.groupsPage__addBtn_img} src={AddGroup} />
        </Link>
      )}
      {location.pathname === '/Groups/Create' && (      
          <CreateGroup/>
    )}
    </main>
  );
};

export default GroupsPage;
