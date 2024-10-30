import { FC } from "react";
import styles from "./FriendsList.module.css";
import { FriendCard } from "./FriendCard/FriendCard";
import { User } from "../../types";
import { avatars } from "../../assets/images/avatars/avatars";

const friends: User[] = [
  {
    id: 1,
    username: "mauzek",
    birthday: "1999-04-15",
    description: "Любитель технологий и игр sdf sdf sdf sdf dfsd fsdfs dsd fsdfsds dfs dfs dfs dfs dfs ds dfsd fsdfs dfsd sdfsdfs dfs dfs dfsd fsd sd sdf sdf sdf sdfs dfsd fds fsdfs fsd fsd dfsd fsdfs d fsdfs sdf s",
    email: "mauzek@example.com",
    firstName: "Артём",
    lastName: "Иллий",
    patronymic: "Андреевич",
    gender: "Мужской",
    isAdmin: true,
    profileImageId: "stitch",
    tgName: "@mauzek",
  },
  {
    id: 2,
    username: "klmrnk",
    birthday: "2000-08-23",
    description: "Фотограф и путешественница",
    email: "annasmith@example.com",
    firstName: "Клим",
    lastName: "Романюк",
    patronymic: "Ивановна",
    gender: "Женский",
    isAdmin: false,
    profileImageId: "cristalYellow",
    tgName: "@annasmith",
  },
  {
    id: 3,
    username: "icqxp",
    birthday: "1998-11-30",
    description: "Спортсмен и кулинар",
    email: "johndoe@example.com",
    firstName: "Илья",
    lastName: "Ляшов",
    patronymic: "Петрович",
    gender: "Мужской",
    isAdmin: false,
    profileImageId: "amnyam",
    tgName: "@johndoe",
  },
  {
    id: 4,
    username: "regxtk",
    birthday: "2001-06-10",
    description: "Музыкант и любитель кино",
    email: "mariak@example.com",
    firstName: "Мария",
    lastName: "Грицюк",
    patronymic: "Сергеевна",
    gender: "Женский",
    isAdmin: false,
    profileImageId: "frog",
    tgName: "@mariak",
  },
  {
    id: 5,
    username: "BigPenis",
    birthday: "1995-02-17",
    description: "Разработчик и путешественник",
    email: "pavel89@example.com",
    firstName: "Дима",
    lastName: "Юрченко",
    patronymic: "Игоревич",
    gender: "Мужской",
    isAdmin: false,
    profileImageId: "pingvin",
    tgName: "@pavel89",
  },
  {
    id: 6,
    username: "soup-chief",
    birthday: "2002-09-05",
    description: "Художница и дизайнер",
    email: "elenap@example.com",
    firstName: "Настя",
    lastName: "Трубина",
    patronymic: "Андреевна",
    gender: "Женский",
    isAdmin: false,
    profileImageId: "kitty",
    tgName: "@elenap",
  },
];

export const FriendsList: FC = () => {

  return (
    <section className={styles.friend_list__container}>
      {
        friends.map((friend) => {
          const avatarId = friend.profileImageId as keyof typeof avatars;
          const friendName = `${friend.firstName} ${friend.lastName}`;
          return (
            <FriendCard
              key={friend.id}
              name={friendName}
              username={friend.username}
              avatar={avatarId}
            />
          );
        })}
    </section>
  );
};
