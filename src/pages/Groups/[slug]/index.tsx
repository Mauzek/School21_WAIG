import { GroupCardListGroups } from "../../../components/GroupCardListGroups/GroupCardListGroups";
import { Group } from "../../../types";
import styles from "./Groups.module.css";
import AddGroup from "../../../assets/icons/add_group.svg";
import { Link, useLocation } from "react-router-dom";
import { CreateGroup } from "../../../components/CreateGroup/CreateGroup";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../../../store/app-store";
import { getAllGroups, getUserCreatedGroups, getUserSubscribedGroups } from "../../../API/api-utils";

const GroupsPage = () => {
  const location = useLocation();
  const { user, token } = useStore();
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = useCallback(async () => {
    if (!token) return;

    try {
      let responseGroups: Group[] | undefined = [];
      
      switch (location.pathname) {
        case "/Groups/All":
          responseGroups = await getAllGroups(token);
          break;
        case "/Groups/Subscriptions":
          if (user) responseGroups = await getUserSubscribedGroups(user.username, token);
          break;
        case "/Groups/Managed":
          if (user) responseGroups = await getUserCreatedGroups(user.username, token);
          break;
      }

      setGroups(responseGroups || []);
    } catch (error) {
      console.error("Ошибка при загрузке списка групп:", error);
    }
  }, [location.pathname, token, user]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <main className={styles.groupsPage}>
      {["/Groups/All", "/Groups/Subscriptions", "/Groups/Managed"].includes(location.pathname) && (
        <GroupCardListGroups groups={groups} />
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
