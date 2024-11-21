import axios from "axios";
import { endpoints } from "./config";
import { User, Interests } from "../types";

const axiosRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, token?: string, data?: any) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({ method, url, headers, data });
    return response.data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};

const authorize = (data: { username: string; password: string }) =>
  axiosRequest('post', endpoints.auth, undefined, data);

const acceptFriendshipReq = (login: string, friendLogin: string, token: string) =>
  axiosRequest('post', endpoints.acceptFriendshipReq(login, friendLogin), token);

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

const registration = (data: registrationData) =>
  axiosRequest('post', endpoints.registration, undefined, data);

const confirmUserEmail = (code: string) =>
  axiosRequest('get', endpoints.confirmEmail(code));

interface CreateGroupData {
  chars: string,
  name: string,
  color: string
  description: string,
  interests: Interests[]
}

const createGroup = (userLogin: string, token: string, data: CreateGroupData) =>
  axiosRequest('post', endpoints.createGroup(userLogin), token, data);

interface UpdateGroupData {
  chars: string,
  name: string,
  color: string,
  description: string,
  interests?: Interests[],
}

const editGroupInfo = (groupId: number, token: string, data: UpdateGroupData) =>
  axiosRequest('put', endpoints.updateGroupInfo(groupId), token, data);

const declineFriendshipReq = (login: string, friendLogin: string, token: string) =>
  axiosRequest('post', endpoints.declineFriendshipReq(login, friendLogin), token);

const leaveFromGroup = (username: string, groupId: string, token: string) =>
  axiosRequest('delete', endpoints.leaveFromGroup(username, groupId), token);

const createInterest = (token: string, data: Interests) =>
  axiosRequest('post', endpoints.adminAddInterest(data.name, data.color), token);

const deleteGroupById = (token: string, groupId: string) =>
  axiosRequest('delete', endpoints.deleteGroupById(groupId), token);

const deleteInterest = (token: string, interestName: string) =>
  axiosRequest('delete', endpoints.deleteInterestByName(interestName), token);

const deleteUser = (token: string, username: string) =>
  axiosRequest('delete', endpoints.deleteUserByLogin(username), token);

const getAdminAllGroups = (token:string) => 
  axiosRequest('get',endpoints.adminGetAllGroups,token);

const getAllGroups = (page: number, elements: number, token: string) =>
  axiosRequest('get', endpoints.getAllGroups(page, elements), token);

const getGroupByPrefixName = (groupName: string, token: string) =>
  axiosRequest('get', endpoints.getGroupsByPrefixName(groupName), token);

const getAllInterests = (token: string) =>
  axiosRequest('get', endpoints.adminGetAllInterests, token);

const getAllUsers = (token: string) =>
  axiosRequest('get', endpoints.adminGetAllUsers, token).then(data => data.map(normalizeUserData));

const getAvailableUsersForInvite = (groupId: string, login: string, token: string) =>
  axiosRequest('get', endpoints.getAvailableUsersForInvite(groupId, login), token);

const getFriendship = (userLogin: string, page: number, elements: number, token: string) =>
  axiosRequest('get', endpoints.getFriendship(userLogin, page, elements), token);

const getTopGroupsByInterests = (token: string) =>
  axiosRequest('get', endpoints.getTopGroupsByInterests, token);

const getFriendshipReq = (userLogin: string, token: string) =>
  axiosRequest('get', endpoints.getFriendshipRequests(userLogin), token);

const getGroupById = (groupID: string, token: string) =>
  axiosRequest('get', endpoints.getGroupById(groupID), token);

interface InterestsProps {
  name: string
}

const getGroupsByInterests = (interests: InterestsProps[], token: string) =>
  axiosRequest('post', endpoints.getGroupsByInterests, token, interests);

const getNotificationsByUsername = (username: string, token: string) =>
  axiosRequest('get', endpoints.getNotificationsByUsername(username), token);

const getUser = (login: string, token: string) =>
  axiosRequest('get', endpoints.getUser(login), token).then(normalizeUserData);

interface userFullName {
  firstName: string,
  lastName: string,
  patronymic: string
}

const getUsersByFullName = (userFullName: userFullName, token: string) =>
  axiosRequest('post', endpoints.getUserByFullname, token, userFullName);

const getUsersByInterests = (interests: InterestsProps[], token: string) =>
  axiosRequest('post', endpoints.getUsersByInterests, token, interests);

const setUserProfileImage = (userLogin: string, token: string, avatarName: string) =>
  axiosRequest('post', endpoints.setUserProfileImage(userLogin, avatarName), token);

const getUserCreatedGroups = (userLogin: string, page: number, elements: number, token: string) =>
  axiosRequest('get', endpoints.getUserCreatedGroups(userLogin, page, elements), token);

const getUserInterests = (login: string, token: string) =>
  axiosRequest('get', endpoints.getUserInterests(login), token);

const getUserSubscribedGroups = (userLogin: string, page: number, elements: number, token: string) =>
  axiosRequest('get', endpoints.getSubscribedGroups(userLogin, page, elements), token);

const inviteUserToGroup = (groupId: string, fromLogin: string, toLogin: string, token: string) =>
  axiosRequest('post', endpoints.inviteUserToGroup(groupId, fromLogin, toLogin), token);

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

const removeFriendship = (userLogin: string, friendLogin: string, token: string) =>
  axiosRequest('delete', endpoints.removeFriendship(userLogin, friendLogin), token);

const sendFriendshipRequest = (userLogin: string, friendLogin: string, token: string) =>
  axiosRequest('post', endpoints.sendFriendshipRequest(userLogin, friendLogin), token);

const statistics = (token: string) =>
  axiosRequest('get', endpoints.statistics, token);

const subscribeToGroup = (userLogin: string, groupId: number, token: string) =>
  axiosRequest('post', endpoints.postUserSubscribeToGroup(userLogin, groupId), token);

interface UpdateUserInfoData {
  firstname: string;
  lastname: string;
  patronymic: string;
  gender: string;
  tgName: string;
  description?: string;
  birthDay: string;
};

const updateInterest = (token: string, interestName: string, color: string) =>
  axiosRequest('put', endpoints.updateInterest(interestName, color), token);

const updateUserInfo = (login: string, token: string, data: UpdateUserInfoData) =>
  axiosRequest('put', endpoints.updateUser(login), token, data);


interface UpdateUserSecurityData {
  newEmail: string;
  newUsername: string;
  newPassword: string;
}

const updateUserSecurity = (login: string, token: string, updateData: UpdateUserSecurityData) =>
  axiosRequest('put', endpoints.updateSecurityInfo(login, updateData.newUsername, updateData.newPassword, updateData.newEmail), token);

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

const acceptNotice = (notificationId: string, token: string) =>
  axiosRequest('post', endpoints.acceptNotification(notificationId), token);

const cancelNotice = (notificationId: string, token: string) =>
  axiosRequest('post', endpoints.cancelNotification(notificationId), token);

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
  getAdminAllGroups,
  getAllGroups,
  getGroupByPrefixName,
  getTopGroupsByInterests,
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
  statistics,
  registration,
  updateInterest,
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