import { FC, useEffect, useState } from "react";
import { useStore } from "../../../store/app-store";
import styles from "./Groups.module.css"
import { Group } from "../../../pages/Home";
import { deleteGroupById, getAdminAllGroups} from "../../../API/api-utils";

export const Groups: FC = () => {
  const { token } = useStore();

  const [groups, setGroups] = useState<Group[]>([]); 

  const handleDeleteGroup  = async (token: string, groupId: string): Promise<void> => {
    if (!token) {
        console.error("Token is required to delete a group.");
        return;
    }
  
    try {
        const result = await deleteGroupById (token, groupId);
        if (result.status==200)
        {
          setGroups(prevGroup => prevGroup.filter(group => group.id !== groupId));
        }
    } catch (error) {
        console.error(`Error deleting group ${groupId}:`, error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        try {
          const result = await getAdminAllGroups(token);
          setGroups(result);
        } catch (error) {
          console.error("Ошибка получения групп:", error);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <table className={styles.groups__table}>
        <thead>
          <tr className={styles.table__titles}>
            <th>ID</th>
            <th>Цвет</th>
            <th>Символы</th>
            <th>Название</th>
            <th>Описание</th>
            <th>ID создателя</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {groups.map(groupsData => {

            return (

              <tr key={groupsData.id}>
                <td>{groupsData.id}</td>
                <td>
                  <div className={styles.color__container}>
                    <div className={styles.color__print} style={{ background: `#${groupsData.color}` }} />
                    <p>
                      {groupsData.color}
                    </p>
                  </div>
                </td>
                <td>{groupsData.chars}</td>
                <td>{groupsData.name}</td>
                <td style={{ width: "530px" }} >{groupsData.description.length > 30 ?
                  <details>
                    <summary>
                      {groupsData.description.substring(0, 27) + "..."}
                    </summary>
                    <p>
                      {groupsData.description.substring(27)}
                    </p>
                  </details> : <>{groupsData.description}</>}
                </td>
                <td>{groupsData.creator.username}</td>
                <td> <button onClick={() => handleDeleteGroup (token, groupsData.id)} className={styles.button__delete}>Delete</button></td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}