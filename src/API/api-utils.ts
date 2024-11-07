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

const createInterest = async (token: string, data: Interests) => {
  try {
    const response = await axios.post(endpoints.adminAddInterest(data.name,data.color),{},{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteGroupById = async (token:string,groupId:string) => {
  try{
    const response = await axios.delete(endpoints.deleteGroupById(groupId), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

}catch (error) {
  console.error("Ошибка удаления группы:", error);
  throw error;
}};

const deleteInterest = async (token:string,interestName:string) => {
  try{
    const response = await axios.delete(endpoints.deleteInterestByName(interestName), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

}catch (error) {
  console.error("Ошибка при удалении интереса:", error);
  throw error;
}};

const deleteUser = async (token:string,username:string) => {
  try{
    const response = await axios.delete(endpoints.deleteUserByLogin(username), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

}catch (error) {
  console.error("Ошибка при обновлении информации о пользователе:", error);
  throw error;
}};

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
    console.error("Ошибка при обновлении информации о пользователе:", error);
    throw error;
  }
};

const getAllInterests = async (token: string) => {
  try{
    const response = await axios.get(endpoints.adminGetAllInterests, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  }catch(error){
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
      ),{},
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
  document.cookie = `jwt=${jwt}`
  localStorage.setItem('jwt', jwt)
}

const getJWT = () => {
  if (document.cookie === '') {
    return localStorage.getItem('jwt')
  }
  const jwt = document.cookie.split(';').find((item) => item.includes('jwt'))
  return jwt ? jwt.split('=')[1] : null
}

const removeJWT = () => {
  document.cookie = 'jwt=;'
  localStorage.removeItem('jwt')
}

const setUsername = (username: string) => {
  document.cookie = `username=${username}`
  localStorage.setItem('username', username)
}

const getUsername = () => {
  if (document.cookie === '') {
    return localStorage.getItem('username')
  }
  const username = document.cookie.split(';').find((item) => item.includes('username'))
  return username ? username.split('=')[1] : null
}

export const isResponseOk = (response: Response | Error): response is Response => {
  return !(response instanceof Error);
};

const logoutUser = () =>{
  document.cookie = 'jwt=; Max-Age=-1;'
  document.cookie = 'username=; Max-Age=-1;'
  localStorage.removeItem('jwt');
  localStorage.removeItem('username');
}

export {
  authorize,
  createGroup,
  createInterest,
  deleteGroupById,
  deleteUser,
  deleteInterest,
  getAllGroups,
  getAllInterests,
  getAllUsers,
  getFriendship,
  getGroupById,
  getUser,
  getUserCreatedGroups,
  getUserInterests,
  registration,
  updateUserInfo,
  updateUserSecurity,
  setJWT,
  getJWT,
  removeJWT,
  setUsername,
  getUsername,
  logoutUser,
  confirmUserEmail
};