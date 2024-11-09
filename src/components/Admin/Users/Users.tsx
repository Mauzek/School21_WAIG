import { FC, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { useStore } from "../../../store/app-store";
import { User } from "../../../types";
import styles from "./Users.module.css";
import { getAllUsers, deleteUser } from "../../../API/api-utils";

export const Users: FC = () => {
  const { token } = useStore();
  const [users, setUsers] = useState<User[]>([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        try {
          setUsers(await getAllUsers(token));
          console.log("Fetched users:", users);
        } catch (error) {
          console.error(error)
          throw error;
        }
      }
    };
    fetchUsers();
  }, []);
  const handleDeleteUser = async (token: string, username: string): Promise<void> => {
    if (!token) {
      console.error("Token is required to delete a user.");
      return;
    }
    try {
      const result = await deleteUser(token, username);
      if (result.status == 200) {
        setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
      }
    } catch (error) {
      console.error(`Error deleting user ${username}:`, error);
    }
  };
  return (
    <>
      <table className={styles.users__table}>
        <thead>
          <tr>
            <th>Login/Nickname</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Telegram</th>
            <th>Гендер</th>
            <th>Email</th>
            <th>Дата рождения</th>
            <th>Администратор</th>
            <th>Описание</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(userone => {
            return (

              <tr key={userone.username}>
                <td>{userone.id}</td>
                <td>      <Link to={`/Profile/${userone.username}`} >{userone.username}</Link></td>
                <td>{userone.firstname}</td>
                <td>{userone.lastname}</td>
                <td>{userone.patronymic}</td>
                <td>{userone.tgName}</td>
                <td>{userone.gender}</td>
                <td>{userone.email}</td>
                <td>{userone.birthday.toString()}</td>
                <td>{userone.isAdmin ? 'Да' : 'Нет'}</td>
                <td style={{ width: "530px" }} >{userone.description.length > 30 ?
                  <details>
                    <summary>
                      {userone.description.substring(0, 27) + "..."}
                    </summary>
                    <p>
                      {userone.description.substring(27)}
                    </p>
                  </details> : <>{userone.description}</>}
                </td>
                <td> <button onClick={() => handleDeleteUser(token, userone.username)}>Delete</button></td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}