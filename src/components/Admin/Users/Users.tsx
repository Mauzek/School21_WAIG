import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../store/app-store";
import { Interests, User } from "../../../types";
import styles from "./Users.module.css";

export const Users: FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useStore();
  let userData: User;
  let userInterests: Interests[];

  const users: User[] =  [{
    "id": "2",
    "username": "Svetlana_89",
    "birthday": "15.05.1989",
    "description": "Творческая душа и любительница путешествий",
    "email": "svetlana89@mail.ru",
    "firstName": "Светлана",
    "lastName": "Петрова",
    "patronymic": "Ивановна",
    "gender": "Ж",
    "isAdmin": false,
    "tgName": "svetlana_travel",
    "profileImageId": "sunset"
  },
  {
    "id": "3",
    "username": "Vladimir_the_Great",
    "birthday": "22.08.1995",
    "description": "Спортсмен и любитель активного образа жизни",
    "email": "vladimir95@mail.ru",
    "firstName": "Владимир",
    "lastName": "Сидоров",
    "patronymic": "Алексеевич",
    "gender": "М",
    "isAdmin": false,
    "tgName": "vlad_sport",
    "profileImageId": "fitness"
  },
  {
    "id": "4",
    "username": "Anastasia_Rose",
    "birthday": "30.12.1992",
    "description": "Фотограф и любитель природы",
    "email": "anastasia92@mail.ru",
    "firstName": "Анастасия",
    "lastName": "Кузнецова",
    "patronymic": "Дмитриевна",
    "gender": "Ж",
    "isAdmin": false,
    "tgName": "anastasia_photos",
    "profileImageId": "nature"
  },
  {
    "id": "5",
    "username": "Igor_Smith",
    "birthday": "01.01.1988",
    "description": "Геймер и программист, обожает технологии",
    "email": "igor88@mail.ru",
    "firstName": "Игорь",
    "lastName": "Смирнов",
    "patronymic": "Викторович",
    "gender": "М",
    "isAdmin": true,
    "tgName": "igor_tech",
    "profileImageId": "gamer"
  },
  {
    "id": "6",
    "username": "Elena_Sunny",
    "birthday": "05.07.1990",
    "description": "Оптимистка, люблю готовить и заниматься фитнесомОптимистка, люблю готовить и заниматься фитнесомОптимистка, люблю готовить и заниматься фитнесомОптимистка, люблю готовить и заниматься фитнесомОптимистка, люблю готовить и заниматься фитнесом",
    "email": "elena90@mail.ru",
    "firstName": "Елена",
    "lastName": "Николаева",
    "patronymic": "Андреевна",
    "gender": "Ж",
    "isAdmin": false,
    "tgName": "elena_fitfoodie",
    "profileImageId": "cooking"
  }



  ]
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
          {users.map(userone => {

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