import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../store/app-store";
import { Interests, User } from "../../../types";
import styles from "./Users.module.css";
import { getAllUsers, getJWT } from "../../../API/api-utils";

export const Users: FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useStore();
  let userData: User;
  let userInterests: Interests[];
  const [users, setUsers] = useState<User[]>([]); // State for all users

  useEffect(() => {
    const fetchUsers = async () => {
      const token = getJWT();
      if (token) {
        try {
          setUsers(await getAllUsers(token));
          console.log("Fetched users:", users);
          // You can filter or process users here if needed
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, []);

  useEffect(()=>{
console.log(users);
  },[users])

  if (user.username === username)
    userData = { ...user };


  return (
    <>
      <table className={styles.users__table}>
        <thead>
          <tr>
            <th>ID</th>
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
          {users&&users.map(userone => {

            return (

              <tr key={userone.id}>
                <td>{userone.id}</td>
                <td>      <Link to={`/Profile/${userone.username}`} >{userone.username}</Link></td>
                <td>{userone.firstName}</td>
                <td>{userone.lastName}</td>
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
                <td> <button>Delete</button></td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}