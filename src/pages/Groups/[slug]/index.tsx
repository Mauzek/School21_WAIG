import { GroupCardListGroups } from "../../../components/GroupCardListGroups/GroupCardListGroups";
import { Group } from "../../../types";
import styles from "./Groups.module.css";
import AddGroup from "../../../assets/icons/add_group.svg";
import { Link, useLocation } from "react-router-dom";
import { CreateGroup } from "../../../components/CreateGroup/CreateGroup";
import { useEffect, useState } from "react";
import { useStore } from "../../../store/app-store";
import { getAllGroups, getUserCreatedGroups } from "../../../API/api-utils";

const GroupsPage = () => {
  const location = useLocation();
  const { user, token } = useStore();
  const [groups, setGroups] = useState<Group[]>([]);
  const [createdGroups, setCreatedGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        if (!token) return;
  
        const responseAllGroups = await getAllGroups(token);
        setGroups(responseAllGroups || []);
  
        if (user?.username) {
          const responseCreatedGroups = await getUserCreatedGroups(
            user.username,
            token
          );
          setCreatedGroups(responseCreatedGroups || []);
        }
      } catch (error) {
        console.error("Ошибка при загрузке списка групп:", error);
      }
    };
  
    fetchAllGroups();
  }, [token, user?.username]); 
  
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
      {location.pathname === "/Groups/Create" && <CreateGroup />}
    </main>
  );
};

export default GroupsPage;
