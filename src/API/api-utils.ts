import axios from "axios";
import { endpoints } from "./config";
import { User, Interests } from "../types";

const authorize = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.post(endpoints.auth, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

const acceptFriendshipReq = async (login: string, friendLogin: string, token: string) => {
  try {
    const response = await axios.post(endpoints.acceptFriendshipReq(login, friendLogin), {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при принятии запроса в друзья:", error);
    throw error;
  }
};

interface registrationData {
  username: string;
  birthDay: string;
  email: string;
  firstname: string;
  lastname: string;
  patronymic?: string;
  gender: string;
  tgName: string;
  password: string;
}

const registration = async (data: registrationData) => {
  try {
    const response = await axios.post(endpoints.registration, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
}

const confirmUserEmail = async (code: string) => {
  try {
    const response = await axios.get(endpoints.confirmEmail(code), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
}

interface CreateGroupData {
  chars: string,
  name: string,
  color: string
  description: string,
  interests: Interests[]
}

const createGroup = async (userLogin: string, token: string, data: CreateGroupData) => {
  try {
    const response = await axios.post(endpoints.createGroup(userLogin), data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении информации о пользователе:", error);
    throw error;
  }
};

interface UpdateGroupData {
  chars: string,
  name: string,
  color: string,
  description: string,
  interests?: Interests[],
}

const editGroupInfo = async (groupId: number, token: string, data: UpdateGroupData) => {
  try {
    const response = await axios.put(endpoints.updateGroupInfo(groupId), data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении информации о группе:", error);
    throw error;
  }
}

const declineFriendshipReq = async (login: string, friendLogin: string, token: string) => {
  try {
    const response = await axios.post(endpoints.declineFriendshipReq(login, friendLogin), {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при принятии запроса в друзья:", error);
    throw error;
  }
};

const leaveFromGroup = async (username: string, groupId: string, token: string) => {
  try {
    const response = await axios.delete(endpoints.leaveFromGroup(username, groupId), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при выходе с группы:", error);
    throw error;
  }
};

const createInterest = async (token: string, data: Interests) => {
  try {
    const response = await axios.post(endpoints.adminAddInterest(data.name, data.color), {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании интереса:", error);
    throw error;
  }
};

const deleteGroupById = async (token: string, groupId: string) => {
  try {
    const response = await axios.delete(endpoints.deleteGroupById(groupId), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

  } catch (error) {
    console.error("Ошибка удаления группы:", error);
    throw error;
  }
};

const deleteInterest = async (token: string, interestName: string) => {
  try {
    const response = await axios.delete(endpoints.deleteInterestByName(interestName), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

  } catch (error) {
    console.error("Ошибка при удалении интереса:", error);
    throw error;
  }
};

const deleteUser = async (token: string, username: string) => {
  try {
    const response = await axios.delete(endpoints.deleteUserByLogin(username), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

  } catch (error) {
    console.error("Ошибка при обновлении информации о пользователе:", error);
    throw error;
  }
};

const getAllGroups = async (token: string) => {
  try {
    const response = await axios.get(endpoints.getAllGroups, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении всех групп:", error);
    throw error;
  }
};

const getGroupByPrefixName = async (groupName: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getGroupsByPrefixName(groupName), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении групп по запросу: ${groupName}`, error);
    throw error;
  }
}

const getAllInterests = async (token: string) => {
  try {
    const response = await axios.get(endpoints.adminGetAllInterests, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении всех интересов:", error);
    throw error;
  }
}

const getAllUsers = async (token: string) => {
  try {
    const response = await axios.get(endpoints.adminGetAllUsers, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.map(normalizeUserData);
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

const getAvailableUsersForInvite = async (groupId: string, login: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getAvailableUsersForInvite(groupId, login), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении всех интересов:", error);
    throw error;
  }
}

const getFriendship = async (userLogin: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getFriendship(userLogin), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении информации о пользователе:", error);
    throw error;
  }
};

const getFriendshipReq = async (userLogin: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getFriendshipRequests(userLogin), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении заявок:", error);
    throw error;
  }
};

const getGroupById = async (groupID: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getGroupById(groupID), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении информации о пользователе:", error);
    throw error;
  }
};

interface InterestsProps {
  name: string
}

const getGroupsByInterests = async (interests: InterestsProps[], token: string) => {
  try {
    const response = await axios.post(
      endpoints.getGroupsByInterests,
      interests,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении информации о группах по интересам:", error);
    throw error;
  }
};

const getNotificationsByUsername = async (username: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getNotificationsByUsername(username), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при уведомлений:", error);
    throw error;
  }
};

const getUser = async (login: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getUser(login), {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    });
    const normalizedData = normalizeUserData(response.data);
    return normalizedData;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

interface userFullName {
  firstName: string,
  lastName: string,
  patronymic: string
}


const getUsersByFullName = async (userFullName: userFullName, token: string) => {
  try {
    const response = await axios.post(endpoints.getUserByFullname, userFullName, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
}

const getUsersByInterests = async (interests: InterestsProps[], token: string) => {
  try {
    const response = await axios.post(
      endpoints.getUsersByInterests,
      interests,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении информации о группах по интересам:", error);
    throw error;
  }
}

const setUserProfileImage = async (userLogin: string, token: string, avatarName: string) => {
  try {
    const response = await axios.post(endpoints.setUserProfileImage(userLogin, avatarName), {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при установке аватара пользователю:", error);
    throw error;
  }
}

const getUserCreatedGroups = async (userLogin: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getUserCreatedGroups(userLogin), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении созданных групп:", error);
    throw error;
  }
};

const getUserInterests = async (
  login: string,
  token: string
): Promise<Interests[]> => {
  try {
    const response = await axios.get(endpoints.getUserInterests(login), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных интересов пользователя:", error);
    throw error;
  }
};

const getUserSubscribedGroups = async (userLogin: string, token: string) => {
  try {
    const response = await axios.get(endpoints.getSubscribedGroups(userLogin), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении информации о группе:", error);
    throw error;
  }
};

const inviteUserToGroup = async (groupId: string, fromLogin: string, toLogin: string, token: string) => {
  try {
    const response = await axios.post(endpoints.inviteUserToGroup(groupId, fromLogin, toLogin), {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка приглашении в группу:", error);
    throw error;
  }
};



interface UserDataFromServer {
  id: string;
  age: number;
  birthDay: string;
  description: string | null;
  email: string;
  firstname: string;
  lastname: string;
  patronymic: string | null;
  profileImageId: string | null;
  tgName: string | null;
  username: string;
  gender: string;
  isAdmin: boolean;
}

const normalizeUserData = (user: UserDataFromServer): User => {
  return {
    id: user.id ?? "",
    username: user.username,
    birthday: user.birthDay ? new Date(user.birthDay).toLocaleDateString('en-US') : "",
    description: user.description ?? "",
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    patronymic: user.patronymic ?? "",
    gender: user.gender,
    isAdmin: user.isAdmin,
    profileImageId: user.profileImageId ?? "",
    tgName: user.tgName ?? "",
    age: user.age,
  };
};

const removeFriendship = async (userLogin: string, friendLogin: string, token: string) => {
  try {
    const response = await axios.delete(endpoints.removeFriendship(userLogin, friendLogin), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении друзья:", error);
    throw error;
  }
};

const sendFriendshipRequest = async (userLogin: string, friendLogin: string, token: string) => {
  try {
    const response = await axios.post(endpoints.sendFriendshipRequest(userLogin, friendLogin), {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении в друзья:", error);
    throw error;
  }
};

const subscribeToGroup = async (userLogin: string, groupId: number, token: string) => {
  try {
    const response = await axios.post(endpoints.postUserSubscribeToGroup(userLogin, groupId), {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при подписывании на группу:", error);
    throw error;
  }
}


interface UpdateUserInfoData {
  firstname: string;
  lastname: string;
  patronymic: string;
  gender: string;
  tgName: string;
  description?: string;
  birthDay: string;
};

const updateUserInfo = async (
  login: string,
  token: string,
  data: UpdateUserInfoData
) => {
  try {
    const response = await axios.put(endpoints.updateUser(login), data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении информации о пользователе:", error);
    throw error;
  }
};

interface UpdateUserSecurityData {
  newEmail: string;
  newUsername: string;
  newPassword: string;
}

const updateUserSecurity = async (
  login: string,
  token: string,
  updateData: UpdateUserSecurityData
) => {
  try {
    const response = await axios.put(
      endpoints.updateSecurityInfo(
        login,
        updateData.newUsername,
        updateData.newPassword,
        updateData.newEmail
      ), {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении информации о пользователе:", error);
    throw error;
  }
};

const setJWT = (jwt: string) => {
  localStorage.setItem('jwt', jwt)
}

const removeJWT = () => {
  localStorage.removeItem('jwt')
}

const setUsername = (username: string) => {
  localStorage.setItem('username', username)
}

const getUsername = () => {
  return localStorage.getItem('username')
}

const getJWT = () => {
  return localStorage.getItem('jwt')
}

export const isResponseOk = (response: Response | Error): response is Response => {
  return !(response instanceof Error);
};

const logoutUser = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('username');
};

const acceptNotice = async (notificationId: string, token: string) => {
  try {
    const response = await axios.post(endpoints.acceptNotification(notificationId), {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при принятии приглашения:", error);
    throw error;
  }
};

const cancelNotice = async (notificationId: string, token: string) => {
  try {
    const response = await axios.post(endpoints.cancelNotification(notificationId), {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отклонении приглашения:", error);
    throw error;
  }
};

export {
  authorize,
  acceptFriendshipReq,
  createGroup,
  declineFriendshipReq,
  editGroupInfo,
  createInterest,
  deleteGroupById,
  deleteUser,
  deleteInterest,
  getAllGroups,
  getGroupByPrefixName,
  getAllInterests,
  getAvailableUsersForInvite,
  getAllUsers,
  getFriendship,
  getFriendshipReq,
  getGroupById,
  getNotificationsByUsername,
  getGroupsByInterests,
  getUser,
  getUsersByFullName,
  getUsersByInterests,
  getUserCreatedGroups,
  getUserInterests,
  getUserSubscribedGroups,
  inviteUserToGroup,
  leaveFromGroup,
  removeFriendship,
  sendFriendshipRequest,
  subscribeToGroup,
  registration,
  updateUserInfo,
  setUserProfileImage,
  updateUserSecurity,
  setJWT,
  getJWT,
  removeJWT,
  setUsername,
  getUsername,
  logoutUser,
  confirmUserEmail,
  acceptNotice,
  cancelNotice,
};