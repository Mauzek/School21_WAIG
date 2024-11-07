import { Navigate, useLocation, useParams } from "react-router-dom";
import { GroupInfo } from "../../../components/GroupComponents/GroupInfo/GroupInfo";
import { GroupMembers } from "../../../components/GroupComponents/GroupMembers/GroupMembers";
import { GroupEdit } from "../../../components/GroupComponents/GroupEdit/GroupEdit";
import { useEffect, useState } from "react";
import styles from "./Group.module.css";
import { useStore } from "../../../store/app-store";
import { getFriendship, getGroupById } from "../../../API/api-utils";
import { Group, Interests, User } from "../../../types";

const GroupPage = () => {
  const location = useLocation();
  const { user, token } = useStore();
  const [groupData, setGroupData] = useState<Group | null>(null);
  const [interestsData, setInterestsData] = useState<Interests[]>([]);
  const [membersData, setMembersData] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (id) {
          const response = await getGroupById(id, token);
          setGroupData(response);
          setInterestsData(response.interests);
          setMembersData(response.subscribers);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFriends = async () => {
      try {
        if (user?.username) {
          const response = await getFriendship(user.username, token);
          setFriends(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFriends();
    fetchGroupData();
  }, [id, token, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (location.pathname === `/Group/${id}/Edit` && groupData?.creator.username !== user?.username) {
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
