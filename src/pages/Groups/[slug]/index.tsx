import { GroupCardListGroups } from "../../../components/GroupCardListGroups/GroupCardListGroups";
import { Group } from "../../../types";
import styles from "./Groups.module.css";
import AddGroup from "../../../assets/icons/add_group.svg";
import { Link, useLocation } from "react-router-dom";
import { CreateGroup } from "../../../components/CreateGroup/CreateGroup";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../../../store/app-store";
import {
  getAllGroups,
  getUserCreatedGroups,
  getUserSubscribedGroups,
} from "../../../API/api-utils";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";
import { ConfigProvider, Pagination } from "antd";

const GroupsPage = () => {
  const location = useLocation();
  const { user, token } = useStore();
  const [groups, setGroups] = useState<Group[]>([]);
  const [paginationData, setPaginationData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(0);

  const fetchGroups = useCallback(async () => {
    if (!token) return;
    try {
      let responseGroups: Group[] | undefined = [];

      switch (location.pathname) {
        case "/Groups/All":
          responseGroups = await getAllGroups(currentPage, 6, token);
          break;
        case "/Groups/Subscriptions":
          if (user)
            responseGroups = await getUserSubscribedGroups(
              user.username,
              currentPage, 6,
              token
            );
          break;
        case "/Groups/Managed":
          if (user)
            responseGroups = await getUserCreatedGroups(user.username, currentPage, 6, token);
          break;
      }
      setPaginationData(responseGroups);
      const groupsResponse = responseGroups && responseGroups.content;
      setGroups(groupsResponse || []);
    } catch (error) {
      console.error("Ошибка при загрузке списка групп:", error);
    }
  }, [location.pathname, token, user, currentPage]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    setCurrentPage(0); 
  }, [location.pathname]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber - 1);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: "#44EB99",
            colorPrimary: "#000",
            itemBg: "#3E4857",
            colorText: "#ffffff",
            colorBorder: "#000",
            colorBgTextHover: "rgba(255, 255, 255, 0.1)",
            colorPrimaryHover: "none",
            itemSize: 42,
          },
        },
      }}
    >
      <main className={styles.groupsPage}>
        {["/Groups/All", "/Groups/Subscriptions", "/Groups/Managed"].includes(
          location.pathname
        ) &&
          (groups.length > 0 ? (
            <GroupCardListGroups groups={groups} />
          ) : (
            <DataNotFound size="medium" />
          ))}

        {location.pathname === "/Groups/Managed" && (
          <Link to="/Groups/Create" className={styles.groupsPage__addBtn}>
            <img className={styles.groupsPage__addBtn_img} src={AddGroup} />
          </Link>
        )}

        {location.pathname === "/Groups/Create" && <CreateGroup />}
        {paginationData.totalPages > 1 && (
          <Pagination
            key={location.pathname}
            onChange={handlePageChange}
            align="center"
            showSizeChanger={false}
            current={currentPage+1}
            total={paginationData.totalElements}
            defaultPageSize={6}
          />
        )}
      </main>
    </ConfigProvider>
  );
};

export default GroupsPage;
