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
  const [redirectTimeout, setRedirectTimeout] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const groupResponse = await getGroupById(id, token);
          setGroupData(groupResponse);
          setInterestsData(groupResponse.interests);
          setMembersData([groupResponse.creator, ...groupResponse.subscribers]);
        }
        if (user?.username) {
          const friendsResponse = await getFriendship(user.username, token);
          setFriends(friendsResponse);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const timeout = setTimeout(() => {
      setRedirectTimeout(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [id, token, user]);

  const handleGroupDataChange = (updatedData: Partial<Group>) => {
    setGroupData((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  const handleInterestsChange = (updatedInterests: Interests[]) => {
    setInterestsData(updatedInterests);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!groupData && redirectTimeout) {
    return <Navigate to="/NotFound404" replace />;
  }

  if (
    location.pathname === `/Group/${id}/Edit` &&
    groupData?.creator.username !== user?.username
  ) {
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
        <GroupEdit
          groupData={groupData}
          dataTags={interestsData}
          onGroupDataChange={handleGroupDataChange}
          onInterestsChange={handleInterestsChange}
        />
      )}
    </main>
  );
};

export default GroupPage;
