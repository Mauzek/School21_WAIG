import { Navigate, useLocation, useParams } from "react-router-dom";
import { GroupInfo } from "../../../components/GroupComponents/GroupInfo/GroupInfo";
import { Group, Interests, User } from "../../../types";
import { useEffect, useState } from "react";
import styles from "./Group.module.css";
import { GroupMembers } from "../../../components/GroupComponents/GroupMembers/GroupMembers";
import { GroupEdit } from "../../../components/GroupComponents/GroupEdit/GroupEdit";
import { useStore } from "../../../store/app-store";
import { getFriendship, getGroupById } from "../../../API/api-utils";

const GroupPage = () => {
  const location = useLocation();
  const { user, token } = useStore();
  const [groupData, setGroupData] = useState<Group | null>(null);
  const [interestsData, setInterestsData] = useState<Interests[]>([]);
  const [membersData, setMembersData] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const { id } = useParams<{ id: string }>();
  // const groupInfo: Group = {
  //   id: 1,
  //   creatorId: "1",
  //   name: "Программируем с Бибой",
  //   chars: "WWs",
  //   color: "#449324",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.",
  //   membersCount: 25000,
  //   interests: [
  //     { name: "сериалы", color: "#F18100" },
  //     { name: "музыка", color: "#00C91E" },
  //     { name: "спорт", color: "#AB2810" },
  //     { name: "чтение", color: "#0099BB" },
  //     { name: "общение", color: "#FFFA5A" },
  //     { name: "гейминг", color: "#DF5B71" },
  //     { name: "рисование", color: "#9C0B9E" },
  //     { name: "монтаж", color: "#7CAB3B" },
  //     { name: "отдых", color: "#161D9B" },
  //     { name: "математика", color: "#793929" },
  //     { name: "физика", color: "#217340" },
  //     { name: "обучение", color: "#BA8D46" },
  //     { name: "правильноепитание", color: "#EB9A93" },
  //   ],
  // };

  // const dataTags: Interests[] = [
  //   { name: "программирование", color: "#B472EE" },
  //   { name: "сериалы", color: "#F18100" },
  //   { name: "музыка", color: "#00C91E" },
  //   { name: "спорт", color: "#AB2810" },
  //   { name: "чтение", color: "#0099BB" },
  //   { name: "общение", color: "#FFFA5A" },
  //   { name: "гейминг", color: "#DF5B71" },
  //   { name: "рисование", color: "#9C0B9E" },
  //   { name: "монтаж", color: "#7CAB3B" },
  //   { name: "отдых", color: "#161D9B" },
  //   { name: "математика", color: "#793929" },
  //   { name: "физика", color: "#217340" },
  //   { name: "обучение", color: "#BA8D46" },
  //   { name: "правильноепитание", color: "#EB9A93" },
  // ];

  // const membersInfo: User[] = [
  //   {
  //     id: "1",
  //     username: "Morganfriman",
  //     birthday: "01/10/2000",
  //     description: "dadada",
  //     email: "lox@gmail.com",
  //     firstName: "Mary",
  //     lastName: "Dadada",
  //     patronymic: "Batkonva",
  //     gender: "Ж",
  //     isAdmin: false,
  //     profileImageId: "stitch",
  //     tgName: "regxtk",
  //   },
  //   {
  //     id: "1",
  //     username: "regxtk",
  //     birthday: "01/10/2000",
  //     description: "dadada",
  //     email: "lox@gmail.com",
  //     firstName: "Mary",
  //     lastName: "Dadada",
  //     patronymic: "Batkonva",
  //     gender: "Ж",
  //     isAdmin: false,
  //     profileImageId: "pingvin",
  //     tgName: "regxtk",
  //   },
  //   {
  //     id: "1",
  //     username: "regxtk",
  //     birthday: "01/10/2000",
  //     description: "dadada",
  //     email: "lox@gmail.com",
  //     firstName: "Mary",
  //     lastName: "Dadada",
  //     patronymic: "Batkonva",
  //     gender: "Ж",
  //     isAdmin: false,
  //     profileImageId: "frog",
  //     tgName: "regxtk",
  //   },
  //   {
  //     id: "1",
  //     username: "regxtk",
  //     birthday: "01/10/2000",
  //     description: "dadada",
  //     email: "lox@gmail.com",
  //     firstName: "Mary",
  //     lastName: "Dadada",
  //     patronymic: "Batkonva",
  //     gender: "Ж",
  //     isAdmin: false,
  //     profileImageId: "frog",
  //     tgName: "regxtk",
  //   },
  //   {
  //     id: "1",
  //     username: "regxtk",
  //     birthday: "01/10/2000",
  //     description: "dadada",
  //     email: "lox@gmail.com",
  //     firstName: "Mary",
  //     lastName: "Dadada",
  //     patronymic: "Batkonva",
  //     gender: "Ж",
  //     isAdmin: false,
  //     profileImageId: "frog",
  //     tgName: "regxtk",
  //   },
  //   {
  //     id: "1",
  //     username: "regxtk",
  //     birthday: "01/10/2000",
  //     description: "dadada",
  //     email: "lox@gmail.com",
  //     firstName: "Mary",
  //     lastName: "Dadada",
  //     patronymic: "Batkonva",
  //     gender: "Ж",
  //     isAdmin: false,
  //     profileImageId: "frog",
  //     tgName: "regxtk",
  //   },
  //   {
  //     id: "1",
  //     username: "regxtk",
  //     birthday: "01/10/2000",
  //     description: "dadada",
  //     email: "lox@gmail.com",
  //     firstName: "Mary",
  //     lastName: "Dadada",
  //     patronymic: "Batkonva",
  //     gender: "Ж",
  //     isAdmin: false,
  //     profileImageId: "frog",
  //     tgName: "regxtk",
  //   },
  //   {
  //     id: "1",
  //     username: "regxtk",
  //     birthday: "01/10/2000",
  //     description: "dadada",
  //     email: "lox@gmail.com",
  //     firstName: "Mary",
  //     lastName: "Dadada",
  //     patronymic: "Batkonva",
  //     gender: "Ж",
  //     isAdmin: false,
  //     profileImageId: "cristalRed",
  //     tgName: "regxtk",
  //   },
  // ];

  useEffect(() => {
    const FetchGroupData = async () => {
      try{
        const response = id && await getGroupById(id, token);
        setGroupData(response);
        setInterestsData(response.interests);
        setMembersData(response.subscribers)

      }catch(error){
        console.error(error)
      }
    }
    const FetchFriends = async () => {
      try{
        const response = id && await getFriendship(user.username, token);
        setFriends(response);

      }catch(error){
        console.error(error)
      }
    }
    FetchFriends();
    FetchGroupData();
  }, []);

  if (location.pathname === `/Group/${id}/Edit` && user.id !== id) {
    return <Navigate to={`/Group/${id}/Main`} replace />;
  }

  return (
    <main className={styles.groupMain__container}>
      {location.pathname === `/Group/${id}/Main` && groupData && (
        <GroupInfo groupInfo={groupData} friends={friends} />
      )}
      {location.pathname === `/Group/${id}/Members` && (
        <GroupMembers membersData={membersData} />
      )}
      {location.pathname === `/Group/${id}/Edit` && groupData && (
        <GroupEdit groupData={groupData} dataTags={interestsData} />
      )}
    </main>
  );
};

export default GroupPage;
